import React from 'react';
import type { Takeaway } from '../types';

interface TakeawaysProps {
  takeaways: {
    title: string;
    points: Takeaway[];
  };
}

export const Takeaways: React.FC<TakeawaysProps> = ({ takeaways }) => {
  return (
    <div className="bg-slate-900/70 border border-amber-500/30 rounded-lg p-6">
      <h3 className="text-xl font-bold text-amber-300 mb-4 font-heading uppercase">{takeaways.title}</h3>
      <ul className="space-y-3">
        {takeaways.points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-amber-400 mt-1 flex-shrink-0 w-6 h-6">{point.icon}</span>
            <span className="text-slate-300">{point.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
