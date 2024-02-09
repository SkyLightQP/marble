import { ComponentType } from 'react';
import { create } from 'zustand';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */

interface ModalStoreState {
  modals: Array<{
    isOpen: boolean;
    component: ComponentType<any>;
    context: Record<string, unknown>;
  }>;
}

interface ModalStoreAction {
  openModal: (component: ComponentType<any>, context: Record<string, unknown>) => void;
  closeModal: (component: ComponentType<any>) => void;
  updateContext: (component: ComponentType<any>, context: Record<string, unknown>) => void;
}

export const useModalStore = create<ModalStoreState & ModalStoreAction>((set) => ({
  modals: [],
  openModal: (component, context) =>
    set((state) => {
      const modalIndex = state.modals.findIndex((m) => m.component === component);
      if (modalIndex === -1) {
        return { modals: [{ isOpen: true, component, context }] };
      }
      state.modals[modalIndex].isOpen = true;
      state.modals[modalIndex].context = context;
      return { modals: state.modals };
    }),
  closeModal: (component) =>
    set((state) => {
      const modalIndex = state.modals.findIndex((m) => m.component === component);
      if (modalIndex !== -1) {
        state.modals[modalIndex].isOpen = false;
      }
      return { modals: state.modals };
    }),
  updateContext: (component, context) =>
    set((state) => {
      const modalIndex = state.modals.findIndex((m) => m.component === component);
      if (modalIndex === -1) {
        return { modals: state.modals };
      }
      state.modals[modalIndex].context = { ...state.modals[modalIndex].context, ...context };
      return { modals: state.modals };
    })
}));
