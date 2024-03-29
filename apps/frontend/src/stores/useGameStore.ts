import { create } from 'zustand';
import { GameStatusResponse, PlayerResponse } from '@/api/SocketResponse';

interface GameStoreState {
  isLoading: boolean;
  roomId: string | undefined;
  turn: number;
  playerOrder: PlayerResponse[];
  currentOrderPlayerIndex: number;
  playerStatus: Record<string, GameStatusResponse>;
  cityWhoHave: Record<number, string>;
}

interface GameStoreAction {
  giveCityToPlayer: (cityId: number, userId: string) => void;
  setState: (newState: Omit<GameStoreState, 'isLoading'>) => void;
}

export const useGameStore = create<GameStoreState & GameStoreAction>((set) => ({
  isLoading: false,
  roomId: '',
  turn: 0,
  playerOrder: [],
  currentOrderPlayerIndex: 0,
  playerStatus: {},
  cityWhoHave: {},
  giveCityToPlayer: (cityId: number, userId: string) => {
    set((state) => ({
      cityWhoHave: {
        ...state.cityWhoHave,
        [cityId]: userId
      }
    }));
  },
  setState: (newState: Omit<GameStoreState, 'isLoading'>) => set({ isLoading: true, ...newState })
}));
