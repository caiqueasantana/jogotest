import React from 'react';
import { LockIcon } from './icons/Icons';

interface HeaderProps {
  totalMissions: number;
  completedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ totalMissions, completedCount }) => {
  const progressPercentage = totalMissions > 0 ? (completedCount / totalMissions) * 100 : 0;
  
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <LockIcon className="w-8 h-8 text-amber-400" />
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-widest uppercase font-heading">
              Proteja Seu <span className="text-amber-400">Castelo Digital</span>
            </h1>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-sm font-semibold text-amber-300">{`Missões Concluídas: ${completedCount} / ${totalMissions}`}</span>
             <div className="w-24 h-2 bg-slate-700 rounded-full mt-1">
                <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{width: `${progressPercentage}%`}}></div>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};
