import React, { useState } from 'react';
import { Shield, Lock, Target, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { SecureAdventure, isMissionRedacted, updateAdventureBounty } from '../lib/supabase';

interface TargetCardProps {
  adventure: SecureAdventure;
  onBountyUpdate?: (adventureId: string, newAmount: number) => void;
}

const TargetCard: React.FC<TargetCardProps> = ({ adventure, onBountyUpdate }) => {
  const [bountyAmount, setBountyAmount] = useState<string>('');
  const [isUpdatingBounty, setIsUpdatingBounty] = useState(false);
  const [showClassifiedInfo, setShowClassifiedInfo] = useState(false);
  const [contributionAmount, setContributionAmount] = useState<number>(0);

  const isRedacted = isMissionRedacted(adventure.status);
  const progressPercentage = Math.min((adventure.bounty_current / adventure.bounty_target) * 100, 100);

  const handleBountyContribution = async () => {
    if (!bountyAmount || isNaN(Number(bountyAmount))) return;

    setIsUpdatingBounty(true);
    try {
      const newAmount = adventure.bounty_current + Number(bountyAmount);
      const updatedAdventure = await updateAdventureBounty(adventure.id, newAmount);
      
      if (onBountyUpdate) {
        onBountyUpdate(adventure.id, newAmount);
      }
      
      setBountyAmount('');
      setContributionAmount(Number(bountyAmount));
      
      // Clear contribution amount after 3 seconds
      setTimeout(() => setContributionAmount(0), 3000);
    } catch (error) {
      console.error('Error updating bounty:', error);
    } finally {
      setIsUpdatingBounty(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scouting': return 'text-orange-400 bg-orange-400/10';
      case 'greenlit': return 'text-blue-400 bg-blue-400/10';
      case 'active': return 'text-red-400 bg-red-400/10';
      case 'complete': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scouting': return <Eye className="w-4 h-4" />;
      case 'greenlit': return <Target className="w-4 h-4" />;
      case 'active': return <Shield className="w-4 h-4" />;
      case 'complete': return <TrendingUp className="w-4 h-4" />;
      default: return <Lock className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {isRedacted ? (
              <Lock className="w-5 h-5 text-orange-400" />
            ) : (
              <Shield className="w-5 h-5 text-blue-400" />
            )}
            <h3 className="text-xl font-bold text-white">
              {isRedacted ? adventure.codename : adventure.display_title}
            </h3>
          </div>
          
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(adventure.status)}`}>
            {getStatusIcon(adventure.status)}
            <span className="uppercase tracking-wider">{adventure.status}</span>
          </div>
        </div>

        {/* Classified Toggle */}
        {isRedacted && (
          <button
            onClick={() => setShowClassifiedInfo(!showClassifiedInfo)}
            className="p-2 text-orange-400 hover:text-orange-300 transition-colors"
          >
            {showClassifiedInfo ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Mission Brief / Description */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
          Mission Brief
        </h4>
        <div className="relative">
          <p className={`text-gray-200 ${isRedacted ? 'blur-md' : ''} transition-all duration-300`}>
            {isRedacted && !showClassifiedInfo 
              ? adventure.display_description 
              : adventure.display_description || 'Mission details classified.'}
          </p>
          
          {/* Classified Overlay */}
          {isRedacted && !showClassifiedInfo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-lg px-4 py-2">
                <span className="text-orange-400 font-bold text-sm tracking-wider">CLASSIFIED</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Location (when not redacted) */}
      {!isRedacted && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Coordinates
          </h4>
          <p className="text-gray-200 font-mono text-sm">
            {adventure.display_lat.toFixed(6)}, {adventure.display_lng.toFixed(6)}
          </p>
        </div>
      )}

      {/* Bounty System */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Mission Bounty
          </h4>
          <div className="text-right">
            <div className="text-green-400 font-bold">
              ${adventure.bounty_current.toFixed(2)} / ${adventure.bounty_target.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400">
              {progressPercentage.toFixed(1)}% Complete
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Contribution Form */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Amount"
            value={bountyAmount}
            onChange={(e) => setBountyAmount(e.target.value)}
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            min="1"
            step="0.01"
          />
          <button
            onClick={handleBountyContribution}
            disabled={!bountyAmount || isUpdatingBounty}
            className="bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {isUpdatingBounty ? 'Processing...' : 'Contribute'}
          </button>
        </div>

        {/* Contribution Success Message */}
        {contributionAmount > 0 && (
          <div className="text-green-400 text-sm font-medium animate-pulse">
            ✓ Contributed ${contributionAmount.toFixed(2)} to the mission!
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="space-y-2 pt-2 border-t border-gray-700/50">
        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
          Mission Timeline
        </h4>
        <div className="text-xs text-gray-400">
          Created: {new Date(adventure.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default TargetCard;