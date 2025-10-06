import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Card } from '@core/types';

type Mode = 'practice' | 'improv';

interface PracticeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  preselectedCard: Card | null;
  preselectedMood: Card | null;
  setPreselectedCards: (card: Card | null, mood?: Card | null) => void;
  clearPreselectedCards: () => void;
}

const PracticeContext = createContext<PracticeContextType | undefined>(undefined);

export function PracticeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('practice');
  const [preselectedCard, setPreselectedCard] = useState<Card | null>(null);
  const [preselectedMood, setPreselectedMood] = useState<Card | null>(null);

  const setPreselectedCards = (card: Card | null, mood?: Card | null) => {
    setPreselectedCard(card);
    setPreselectedMood(mood || null);
  };

  const clearPreselectedCards = () => {
    setPreselectedCard(null);
    setPreselectedMood(null);
  };

  return (
    <PracticeContext.Provider
      value={{
        mode,
        setMode,
        preselectedCard,
        preselectedMood,
        setPreselectedCards,
        clearPreselectedCards,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
}

export function usePractice() {
  const context = useContext(PracticeContext);
  if (context === undefined) {
    throw new Error('usePractice must be used within a PracticeProvider');
  }
  return context;
}
