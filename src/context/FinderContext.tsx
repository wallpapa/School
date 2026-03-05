"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export interface FinderState {
  persona: string | null;
  budgetMax: number;
  childAge: string;
  schoolStyles: string[];
  lat: number | null;
  lng: number | null;
  zone: string;
  curricula: string[];
  learningStyles: string[];
  uniGoal: string;
  faculty: string;
  currentSchool: string;
}

interface FinderContextType {
  state: FinderState;
  update: (partial: Partial<FinderState>) => void;
  reset: () => void;
}

const defaultState: FinderState = {
  persona: null,
  budgetMax: 800000,
  childAge: "",
  schoolStyles: [],
  lat: null,
  lng: null,
  zone: "",
  curricula: [],
  learningStyles: [],
  uniGoal: "",
  faculty: "",
  currentSchool: "",
};

const FinderContext = createContext<FinderContextType>({
  state: defaultState,
  update: () => {},
  reset: () => {},
});

export function FinderProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FinderState>(defaultState);

  const update = (partial: Partial<FinderState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  };

  const reset = () => setState(defaultState);

  return (
    <FinderContext.Provider value={{ state, update, reset }}>
      {children}
    </FinderContext.Provider>
  );
}

export const useFinder = () => useContext(FinderContext);
