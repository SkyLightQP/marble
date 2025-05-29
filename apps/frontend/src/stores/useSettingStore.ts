import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SettingStoreState {
  backgroundVolume: number;
  isBackgroundMute: boolean;
}

interface SettingStoreAction {
  setBackgroundVolume: (volume: number) => void;
  setBackgroundMute: (isMute: boolean) => void;
}

export const useSettingStore = create(
  persist<SettingStoreState & SettingStoreAction>(
    (set) => ({
      backgroundVolume: 0.1,
      isBackgroundMute: false,
      setBackgroundVolume: (volume) => set({ backgroundVolume: volume }),
      setBackgroundMute: (isMute) => set({ isBackgroundMute: isMute })
    }),
    {
      name: 'marble-setting',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
