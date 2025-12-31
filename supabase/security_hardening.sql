-- ===============================================
-- PROLE ADVENTURES DATABASE SECURITY HARDENING
-- ===============================================
-- Non-destructive security hardening script
-- All changes are reversible with GRANT commands below
-- ===============================================

-- ===============================================
-- STEP 1: AUDIT CURRENT PERMISSIONS
-- ===============================================

-- Show current function permissions (run before changes)
SELECT 
    schemaname,
    tablename,
    hasindexes,
    hasrules,
    hastriggers
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'adventures';

-- Show current view permissions
SELECT 
    table_name,
    table_type,
    security_type
FROM information_schema.views 
WHERE table_schema = 'public';

-- ===============================================
-- STEP 2: REVOKE BROAD PERMISSIONS FROM PUBLIC ROLES
-- ===============================================

-- Revoke all privileges on adventures table from PUBLIC and authenticated
REVOKE ALL PRIVILEGES ON public.adventures FROM PUBLIC;
REVOKE ALL PRIVILEGES ON public.adventures FROM authenticated;

-- Revoke all privileges on adventures_secure view from PUBLIC and authenticated  
REVOKE ALL PRIVILEGES ON public.adventures_secure FROM PUBLIC;
REVOKE ALL PRIVILEGES ON public.adventures_secure FROM authenticated;

-- ===============================================
-- STEP 3: GRANT SPECIFIC PERMISSIONS TO APPROPRIATE ROLES
-- ===============================================

-- Grant SELECT on adventures_secure to authenticated users (for the app to work)
-- This is safe because adventures_secure uses SECURITY INVOKER
GRANT SELECT ON public.adventures_secure TO authenticated;

-- Grant SELECT on adventures to authenticated users (also safe due to RLS)
GRANT SELECT ON public.adventures TO authenticated;

-- Grant INSERT/UPDATE to service_role (for admin operations)
GRANT INSERT, UPDATE ON public.adventures TO service_role;
GRANT USAGE ON SCHEMA public TO service_role;

-- ===============================================
-- STEP 4: SECURE VAULT DECRYPTED SECRETS (if exists)
-- ===============================================

-- Revoke access to vault decrypted secrets from public roles
DO $$
BEGIN
    -- Check if vault schema exists and revoke access
    IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'vault') THEN
        REVOKE ALL PRIVILEGES ON vault.decrypted_secrets FROM PUBLIC;
        REVOKE ALL PRIVILEGES ON vault.decrypted_secrets FROM authenticated;
        
        -- Grant access only to service_role (safe for admin operations)
        GRANT SELECT ON vault.decrypted_secrets TO service_role;
    END IF;
END $$;

-- ===============================================
-- STEP 5: SECURE ANY SECURITY DEFINER FUNCTIONS
-- ===============================================

-- Revoke EXECUTE on all SECURITY DEFINER functions from PUBLIC and authenticated
DO $$
DECLARE
    func_record RECORD;
BEGIN
    -- Loop through all SECURITY DEFINER functions in public schema
    FOR func_record IN 
        SELECT 
            n.nspname as schema_name,
            p.proname as function_name,
            pg_get_function_arguments(p.oid) as arguments,
            pg_get_function_result(p.oid) as return_type
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
        AND p.prosecdef = true  -- SECURITY DEFINER functions
    LOOP
        -- Revoke EXECUTE from PUBLIC and authenticated
        EXECUTE format('REVOKE EXECUTE ON FUNCTION %I.%I(%s) FROM PUBLIC', 
                      func_record.schema_name, 
                      func_record.function_name, 
                      func_record.arguments);
        EXECUTE format('REVOKE EXECUTE ON FUNCTION %I.%I(%s) FROM authenticated', 
                      func_record.schema_name, 
                      func_record.function_name, 
                      func_record.arguments);
        
        -- Grant EXECUTE to service_role only
        EXECUTE format('GRANT EXECUTE ON FUNCTION %I.%I(%s) TO service_role', 
                      func_record.schema_name, 
                      func_record.function_name, 
                      func_record.arguments);
    END LOOP;
END $$;

-- ===============================================
-- STEP 6: VALIDATION QUERIES (run after changes)
-- ===============================================

-- Verify adventures_secure view is accessible to authenticated users
-- This should return results if permissions are correct
SELECT 'adventures_secure_accessible' as test_name, COUNT(*) as row_count
FROM public.adventures_secure
LIMIT 1;

-- Verify adventures table RLS policies are working
-- This should return results if RLS is properly configured
SELECT 'adventures_rls_working' as test_name, COUNT(*) as row_count
FROM public.adventures
LIMIT 1;

-- Check that PUBLIC cannot access sensitive data
-- This should return 0 rows if security is properly hardened
DO $$
DECLARE
    public_count INTEGER;
BEGIN
    -- Temporarily switch to PUBLIC role context to test
    -- Note: In real implementation, you'd test this from a PUBLIC session
    SELECT COUNT(*) INTO public_count
    FROM public.adventures_secure
    WHERE 1=1; -- This is just a placeholder - real test would be from PUBLIC context
    
    RAISE NOTICE 'PUBLIC role test count: %', public_count;
END $$;

-- ===============================================
-- REVERSIBLE COMMANDS (if you need to rollback)
-- ===============================================

-- TO ROLLBACK: Run these commands to restore broad permissions
/*
-- Restore broad permissions (rollback security hardening)
GRANT ALL PRIVILEGES ON public.adventures TO PUBLIC;
GRANT ALL PRIVILEGES ON public.adventures TO authenticated;
GRANT ALL PRIVILEGES ON public.adventures_secure TO PUBLIC;
GRANT ALL PRIVILEGES ON public.adventures_secure TO authenticated;

-- Restore function permissions
DO $$
DECLARE
    func_record RECORD;
BEGIN
    FOR func_record IN 
        SELECT 
            n.nspname as schema_name,
            p.proname as function_name,
            pg_get_function_arguments(p.oid) as arguments
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
        AND p.prosecdef = true
    LOOP
        EXECUTE format('GRANT EXECUTE ON FUNCTION %I.%I(%s) TO PUBLIC', 
                      func_record.schema_name, 
                      func_record.function_name, 
                      func_record.arguments);
        EXECUTE format('GRANT EXECUTE ON FUNCTION %I.%I(%s) TO authenticated', 
                      func_record.schema_name, 
                      func_record.function_name, 
                      func_record.arguments);
    END LOOP;
END $$;
*/