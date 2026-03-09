"use client";

import { createContext, useContext, ReactNode } from 'react';

type Theme = 'wedding' | 'events';

const ScrollEffectsContext = createContext<{ theme: Theme }>({ theme: 'wedding' });

export function useScrollEffects() {
  return useContext(ScrollEffectsContext);
}

export function ScrollEffectsProvider({ theme, children }: { theme: Theme; children: ReactNode }) {
  return (
    <ScrollEffectsContext.Provider value={{ theme }}>
      {children}
    </ScrollEffectsContext.Provider>
  );
}
