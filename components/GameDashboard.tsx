import React from 'react';
import type { Module } from '../types';
import { CastleIcon, ShieldCheckIcon } from './icons/Icons';

interface MissionNodeProps {
  module: Module;
  isSelected: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

const MissionNode: React.FC<MissionNodeProps> = ({ module, isSelected, isCompleted, onClick }) => {
    const baseClasses = "w-full text-left p-3 rounded-md transition-all duration-200 flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800";
    
    let stateClasses = "bg-slate-700/50 hover:bg-slate-600/50 text-slate-300";
    if (isCompleted) {
        stateClasses = "bg-green-500/10 text-slate-200";
    }
    if (isSelected) {
        stateClasses = "bg-amber-500/10 text-white ring-2 ring-amber-400";
    }

    return (
        <button
        onClick={onClick}
        className={`${baseClasses} ${stateClasses}`}
        aria-current={isSelected ? 'page' : undefined}
        >
        <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${isSelected ? 'bg-amber-400/20 text-amber-300' : isCompleted ? 'bg-green-400/20 text-green-300' : 'bg-slate-600 text-slate-400'}`}>
            {isCompleted ? <ShieldCheckIcon className="w-5 h-5" /> : module.icon}
        </div>
        <div className="flex-grow">
            <span className={`font-semibold block ${isSelected ? 'text-amber-300' : isCompleted ? 'text-green-300' : 'text-slate-200'}`}>{`Missão ${module.id}`}</span>
            <span className="text-sm text-slate-400">{module.title}</span>
        </div>
        </button>
    );
};


interface GameDashboardProps {
  modules: Module[];
  selectedModuleId: number;
  completedMissions: number[];
  onSelectModule: (id: number) => void;
}

export const GameDashboard: React.FC<GameDashboardProps> = ({ modules, selectedModuleId, completedMissions, onSelectModule }) => {
  const allCompleted = completedMissions.length === modules.length;
    
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 h-full flex flex-col">
      <div className="text-center p-4 border-b border-slate-700 mb-4">
        <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full transition-colors duration-500 ${allCompleted ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-700 text-slate-400'}`}>
            <CastleIcon className="w-10 h-10" />
        </div>
        <h2 className="text-lg font-bold mt-2 font-heading uppercase text-amber-300">Seu Castelo</h2>
        <p className="text-xs text-slate-400">{allCompleted ? "Fortaleza Digital Máxima!" : "Defesas em construção..."}</p>
      </div>
      <h3 className="text-lg font-semibold mb-4 text-amber-300 px-2 font-heading uppercase">Suas Missões</h3>
      <nav className="flex flex-col gap-2 flex-grow">
        {modules.map((module) => (
          <MissionNode
            key={module.id}
            module={module}
            isSelected={module.id === selectedModuleId}
            isCompleted={completedMissions.includes(module.id)}
            onClick={() => onSelectModule(module.id)}
          />
        ))}
      </nav>
    </div>
  );
};
