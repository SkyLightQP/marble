import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SettingStoreState {
  backgroundVolume: number;
  isBackgroundMute: boolean;
}

interface SettingStoreAction {
  toggleBackgroundMute: () => void;
}

export const useSettingStore = create(
  persist<SettingStoreState & SettingStoreAction>(
    (set, get) => ({
      backgroundVolume: 0.1,
      isBackgroundMute: false,
      toggleBackgroundMute: () => set({ isBackgroundMute: !get().isBackgroundMute })
    }),
    {
      name: 'marble-setting',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
