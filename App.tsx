import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ModuleContent } from './components/ModuleContent';
import { GameDashboard } from './components/GameDashboard';
import { MODULES } from './constants';
import type { Module } from './types';

const App: React.FC = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);

  const selectedModule: Module | undefined = useMemo(() => 
    MODULES.find(m => m.id === selectedModuleId), 
    [selectedModuleId]
  );
  
  const handleMissionComplete = (missionId: number) => {
    if (!completedMissions.includes(missionId)) {
      setCompletedMissions(prev => [...prev, missionId].sort((a, b) => a - b));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex flex-col">
      <Header totalMissions={MODULES.length} completedCount={completedMissions.length} />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/3 lg:w-1/4">
          <GameDashboard 
            modules={MODULES}
            selectedModuleId={selectedModuleId}
            completedMissions={completedMissions}
            onSelectModule={setSelectedModuleId}
          />
        </aside>
        <section className="w-full md:w-2/3 lg:w-3/4">
          {selectedModule ? (
            <ModuleContent 
              key={selectedModule.id} 
              module={selectedModule}
              isCompleted={completedMissions.includes(selectedModule.id)}
              onMissionComplete={() => handleMissionComplete(selectedModule.id)}
            />
          ) : (
            <div className="text-center p-10 bg-slate-800 rounded-lg">
              <h2 className="text-2xl font-bold font-heading uppercase text-amber-400">Missão não encontrada</h2>
              <p className="mt-2 text-slate-400">Por favor, selecione uma missão no painel para começar.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
