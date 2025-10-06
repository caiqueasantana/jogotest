import type React from 'react';

export enum InteractionType {
  SIMULATION = 'simulation',
  QUIZ = 'quiz',
  PUZZLE = 'puzzle',
  DEBATE = 'debate',
  ACTION_MAP = 'action_map',
}

export interface Interaction {
  title: string;
  type: InteractionType;
  description: string;
  data: QuizData | SimulationData | PuzzleData | DebateData | ActionMapData;
}

export interface QuizData {
  questions: {
    image: string;
    caption: string;
    options: { text: string; isCorrect: boolean }[];
    feedback: string;
  }[];
}

export interface SimulationData {
    elements: {
        id: string;
        label: string;
        description: string;
    }[];
    completionThreshold: number; // Number of elements to click to complete
}

export interface PuzzleData {
    vulnerabilities: { id: string; name: string; description: string; }[];
    defenses: { id: string; name: string; counter: string; }[];
}

export interface DebateData {
    sideA: { title: string; points: string[]; };
    sideB: { title: string; points: string[]; };
}

export interface ActionMapData {
    steps: { title: string; description: string; }[];
}


export interface Takeaway {
  text: string;
  icon: React.ReactNode;
}

export interface Module {
  id: number;
  missionTitle: string;
  title: string;
  icon: React.ReactNode;
  concept: string;
  description: React.ReactNode;
  interaction: Interaction;
  reward: {
    badge: React.ReactNode;
    text: string;
  };
  takeaways: {
    title: string;
    points: Takeaway[];
  };
}
