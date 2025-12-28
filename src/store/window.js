import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX , WINDOW_CONFIG } from "../constants/index.js";



const usewindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowkey, data = null) =>
      set((state) => {
        const win = state.windows[windowkey];
        if(!win) return;
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++; // 
      }),

    closeWindow: (windowkey) =>
      set((state) => {
        const win = state.windows[windowkey];
        if(!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    focusWindow: (windowkey) =>
      set((state) => {
        const win = state.windows[windowkey];
        win.zIndex = state.nextZIndex++; 
      })
  }))
);

export default usewindowStore;