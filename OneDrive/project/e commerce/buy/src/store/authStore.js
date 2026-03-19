import { create } from 'zustand';
import { mockAuth } from '../services/mockAuthService';

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  signOut: async () => {
    await mockAuth.logout();
    set({ user: null });
  }
}));

// Initialize the observer with the mock service
mockAuth.onAuthStateChanged((user) => {
  useAuthStore.getState().setUser(user);
  useAuthStore.getState().setLoading(false);
});
