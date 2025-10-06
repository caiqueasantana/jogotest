import React, { useState, useEffect } from 'react';
import { InteractionType, type Interaction, type QuizData, type SimulationData, type PuzzleData, type DebateData, type ActionMapData } from '../types';

interface InteractionHostProps {
    interaction: Interaction;
    onComplete: () => void;
}

const InteractionContainer: React.FC<React.PropsWithChildren<{ title: string; description: string }>> = ({ title, description, children }) => (
    <div className="bg-slate-900/70 border border-amber-500/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-amber-300 mb-2 font-heading uppercase">{title}</h3>
        <p className="text-slate-400 mb-6">{description}</p>
        <div>{children}</div>
    </div>
);

const Simulation: React.FC<{ data: SimulationData, onComplete: () => void }> = ({ data, onComplete }) => {
    const [selected, setSelected] = useState<string[]>([]);

    const getElementInfo = (id: string) => data.elements.find(e => e.id === id);

    const handleSelect = (id: string) => {
        setSelected(prev => [...new Set([...prev, id])]);
    };

    useEffect(() => {
        if (selected.length >= data.completionThreshold) {
            onComplete();
        }
    }, [selected, data.completionThreshold, onComplete]);

    return (
        <div>
            <div className="bg-slate-800 p-4 rounded-lg flex justify-around items-center mb-4 border border-slate-600">
                {data.elements.map(el => (
                    <button key={el.id} onClick={() => handleSelect(el.id)} className={`px-4 py-2 rounded-md transition-all font-semibold ${selected.includes(el.id) ? 'bg-amber-500 text-slate-900 scale-105 ring-2 ring-amber-300' : 'bg-slate-700 hover:bg-slate-600'}`}>
                        {el.label}
                    </button>
                ))}
            </div>
            {selected.length > 0 && (
                 <div className="mt-4 p-4 bg-amber-900/50 text-amber-200 border border-amber-700 rounded-md">
                    <p><strong className="font-bold">{getElementInfo(selected[selected.length - 1])?.label}:</strong> {getElementInfo(selected[selected.length-1])?.description}</p>
                 </div>
            )}
        </div>
    );
};

const Quiz: React.FC<{ data: QuizData, onComplete: () => void }> = ({ data, onComplete }) => {
    const [feedback, setFeedback] = useState<string | null>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const [completed, setCompleted] = useState(false);

    const handleSelect = (optionText: string, isCorrect: boolean, feedbackMsg: string) => {
        if(completed) return;
        setSelected(optionText);
        setFeedback(isCorrect ? `Correto! ${feedbackMsg}` : `Incorreto. ${feedbackMsg}`);
        if(isCorrect) {
            setCompleted(true);
            setTimeout(() => onComplete(), 1500);
        }
    };
    
    // For this prototype, we'll just show one question with two options.
    const question = data.questions[0];
    const otherOption = data.questions[1];

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[question, otherOption].map((q, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <img src={q.image} alt={q.caption} className="rounded-lg mb-2 border-2 border-slate-600 aspect-video object-cover"/>
                        <p className="text-sm text-center text-slate-400 mb-2 h-10">{q.caption}</p>
                        <button
                            onClick={() => handleSelect(q.options[0].text, q.options[0].isCorrect, q.feedback)}
                            className={`w-full px-4 py-2 rounded-md transition-colors font-semibold disabled:opacity-50 ${selected === q.options[0].text ? (q.options[0].isCorrect ? 'bg-green-500' : 'bg-red-500') : 'bg-slate-700 hover:bg-slate-600'}`}
                            disabled={completed}
                        >
                            {q.options[0].text}
                        </button>
                    </div>
                ))}
            </div>
            {feedback && (
                <div className={`mt-4 p-4 rounded-md text-white ${feedback.startsWith('Correto') ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'}`}>
                    {feedback}
                </div>
            )}
        </div>
    );
};


const Puzzle: React.FC<{ data: PuzzleData, onComplete: () => void }> = ({ data, onComplete }) => {
    const [solved, setSolved] = useState<string[]>([]);
    
    const isSolved = (vulnId: string) => solved.includes(vulnId);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, vulnId: string) => {
        e.preventDefault();
        const defenseId = e.dataTransfer.getData("defenseId");
        const defense = data.defenses.find(d => d.id === defenseId);
        if (defense && defense.counter === vulnId && !isSolved(vulnId)) {
            setSolved(prev => [...prev, vulnId]);
        }
    };

    useEffect(() => {
        if (solved.length === data.vulnerabilities.length) {
            onComplete();
        }
    }, [solved, data.vulnerabilities.length, onComplete]);
    
    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 space-y-4">
                <h4 className="font-semibold text-slate-300">Ameaças Ativas</h4>
                {data.vulnerabilities.map(vuln => (
                    <div 
                        key={vuln.id} 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, vuln.id)}
                        className={`p-4 rounded-lg border-2 min-h-[100px] transition-colors ${isSolved(vuln.id) ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-dashed border-red-500'}`}
                    >
                        <h5 className="font-bold">{vuln.name}</h5>
                        <p className="text-sm text-slate-400">{vuln.description}</p>
                        {isSolved(vuln.id) && <p className="text-green-400 font-bold mt-2">Neutralizada!</p>}
                    </div>
                ))}
            </div>
            <div className="w-full md:w-1/2 space-y-2">
                <h4 className="font-semibold text-slate-300">Suas Defesas</h4>
                {data.defenses.map(defense => (
                    <div 
                        key={defense.id}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData("defenseId", defense.id)}
                        className="p-3 bg-slate-700 rounded-md cursor-grab active:cursor-grabbing"
                    >
                        {defense.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

const Debate: React.FC<{ data: DebateData, onComplete: () => void }> = ({ data, onComplete }) => (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 bg-slate-800 p-4 rounded-lg border-l-4 border-fuchsia-500">
                <h4 className="font-bold text-lg mb-2 text-fuchsia-400 font-heading">{data.sideA.title}</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {data.sideA.points.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
            </div>
            <div className="w-full md:w-1/2 bg-slate-800 p-4 rounded-lg border-l-4 border-amber-500">
                <h4 className="font-bold text-lg mb-2 text-amber-400 font-heading">{data.sideB.title}</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {data.sideB.points.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
            </div>
        </div>
        <button onClick={onComplete} className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-4 rounded transition-colors">Concluir Reflexão e Finalizar Missão</button>
    </div>
);

const ActionMap: React.FC<{ data: ActionMapData, onComplete: () => void }> = ({ data, onComplete }) => (
     <div className="space-y-6">
        <div className="space-y-4">
            {data.steps.map((step, i) => (
                <div key={i} className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-bold text-lg text-amber-400 font-heading">{step.title}</h4>
                    <p className="text-slate-300">{step.description}</p>
                </div>
            ))}
        </div>
         <button onClick={onComplete} className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-4 rounded transition-colors">Confirmar Engajamento e Finalizar Missão</button>
    </div>
);


export const InteractionHost: React.FC<InteractionHostProps> = ({ interaction, onComplete }) => {
    const renderInteraction = () => {
        switch (interaction.type) {
            case InteractionType.SIMULATION:
                return <Simulation data={interaction.data as SimulationData} onComplete={onComplete} />;
            case InteractionType.QUIZ:
                return <Quiz data={interaction.data as QuizData} onComplete={onComplete} />;
            case InteractionType.PUZZLE:
                return <Puzzle data={interaction.data as PuzzleData} onComplete={onComplete} />;
            case InteractionType.DEBATE:
                return <Debate data={interaction.data as DebateData} onComplete={onComplete} />;
            case InteractionType.ACTION_MAP:
                return <ActionMap data={interaction.data as ActionMapData} onComplete={onComplete} />;
            default:
                return <p>Interação não implementada.</p>;
        }
    };

    return (
        <InteractionContainer title={interaction.title} description={interaction.description}>
            {renderInteraction()}
        </InteractionContainer>
    );
};
