import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppConfig, Tool } from '../types';

interface Store {
  config: AppConfig | null;
  currentTool: Tool | null;
  setConfig: (config: AppConfig) => void;
  setCurrentTool: (tool: Tool | null) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      config: null,
      currentTool: null,
      setConfig: (config) => set({ config }),
      setCurrentTool: (tool) => set({ currentTool: tool }),
    }),
    {
      name: 'ai-tools-storage',
    }
  )
);
