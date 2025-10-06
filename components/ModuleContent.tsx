import React from 'react';
import type { Module } from '../types';
import { InteractionHost } from './InteractionHost';
import { Takeaways } from './Takeaways';
import { ShieldCheckIcon } from './icons/Icons';

interface ModuleContentProps {
  module: Module;
  isCompleted: boolean;
  onMissionComplete: () => void;
}

const MissionComplete: React.FC<{ module: Module }> = ({ module }) => (
  <div className="text-center p-8 bg-gradient-to-b from-amber-500/10 to-transparent rounded-lg border-2 border-amber-400 animate-fade-in">
    <div className="flex justify-center items-center mb-4">
       <span className="text-amber-300 w-24 h-24">{module.reward.badge}</span>
    </div>
    <h3 className="text-2xl font-bold font-heading uppercase text-amber-300">Missão Concluída!</h3>
    <p className="mt-2 text-slate-300 max-w-md mx-auto">{module.reward.text}</p>
    <div className="mt-6 border-t border-slate-700 pt-6">
        <Takeaways takeaways={module.takeaways} />
    </div>
  </div>
);

export const ModuleContent: React.FC<ModuleContentProps> = ({ module, isCompleted, onMissionComplete }) => {
  return (
    <article className="bg-slate-800/50 rounded-lg p-6 md:p-8 border border-slate-700 space-y-8 animate-fade-in">
      <header>
        <h2 className="text-3xl font-bold text-amber-400 mb-2 font-heading uppercase">{module.missionTitle}</h2>
        <p className="text-lg text-slate-300 italic">
          <span className="font-semibold text-slate-200">Inteligência de Missão:</span> "{module.concept}"
        </p>
      </header>
      
      <div className="prose prose-invert prose-p:text-slate-300 prose-strong:text-amber-400 max-w-none">
        {module.description}
      </div>
      
      {isCompleted ? (
        <MissionComplete module={module} />
      ) : (
        <>
          <InteractionHost interaction={module.interaction} onComplete={onMissionComplete} />
          <Takeaways takeaways={module.takeaways} />
        </>
      )}
    </article>
  );
};
