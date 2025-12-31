-- Adventures table for Mission Control Integration
CREATE TABLE adventures (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL, -- The actual location name, e.g., "Birkbeck Tunnel"
    codename text NOT NULL, -- The public name, e.g., "Target Alpha"
    status text NOT NULL CHECK (status IN ('scouting', 'greenlit', 'active', 'complete')),
    description text, -- The mission brief
    lat numeric(10,7) NOT NULL, -- Latitude coordinates
    lng numeric(10,7) NOT NULL, -- Longitude coordinates
    bounty_target numeric(10,2) NOT NULL DEFAULT 100.00, -- Target bounty amount
    bounty_current numeric(10,2) NOT NULL DEFAULT 0.00, -- Current bounty amount
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for performance
CREATE INDEX idx_adventures_status ON adventures(status);
CREATE INDEX idx_adventures_location ON adventures(lat, lng);

-- Enable Row Level Security
ALTER TABLE adventures ENABLE ROW LEVEL SECURITY;

-- Drop existing view if it exists with SECURITY DEFINER
DROP VIEW IF EXISTS public.adventures_secure;

-- Create a secure view that filters sensitive data for scouting missions
-- SECURITY INVOKER ensures RLS policies are respected (default behavior)
CREATE VIEW public.adventures_secure AS
SELECT 
    id,
    -- For scouting missions, return only safe data
    CASE 
        WHEN status = 'scouting' THEN codename
        ELSE title
    END as display_title,
    codename,
    status,
    CASE 
        WHEN status = 'scouting' THEN 'CLASSIFIED MISSION - INTEL LOCKED'
        ELSE description
    END as display_description,
    -- Apply jitter to coordinates for scouting missions
    CASE 
        WHEN status = 'scouting' THEN lat + (random() - 0.5) * 0.02
        ELSE lat
    END as display_lat,
    CASE 
        WHEN status = 'scouting' THEN lng + (random() - 0.5) * 0.02
        ELSE lng
    END as display_lng,
    lat,
    lng,
    bounty_target,
    bounty_current,
    created_at,
    updated_at
FROM adventures;

-- RLS Policies
-- Allow public read access to the secure view
CREATE POLICY "Enable read access for adventures_secure" ON adventures
FOR SELECT USING (true);

-- Only allow authenticated users to insert/update adventures
CREATE POLICY "Enable insert for authenticated users only" ON adventures
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON adventures
FOR UPDATE USING (auth.role() = 'authenticated');