import { create } from "zustand";

interface UserProps {
  name: string;
  email: string;
  password: string;
}

interface AuthStoreProps {
  users: UserProps[];
  isLoggedIn: null | UserProps;
  error: null | string;
  signUp: (user: UserProps) => void;
  logIn: (user: UserProps) => void;
}

export const useAuthStore = create<AuthStoreProps>((set) => ({
  users: [],
  isLoggedIn: null,
  error: null,
  signUp: (newUser) =>
    set((state) => {
      const nameExists = state.users.some((u) => u.name === newUser.name);
      const emailExists = state.users.some((u) => u.email === newUser.email);

      if (nameExists) {
        return { error: "Username is already taken" };
      }

      if (emailExists) {
        return { error: "Email is already registered" };
      }

      return {
        users: [...state.users, newUser],
        isLoggedIn: newUser,
        error: null,
      };
    }),
  logIn: (credentials) =>
    set((state) => {
      const foundUser = state.users.find(
        (u) =>
          u.name === credentials.name &&
          u.email === credentials.email &&
          u.password === credentials.password
      );

      if (!foundUser) {
        return { error: "Invalid credentials", isLoggedIn: null };
      }

      return {
        isLoggedIn: foundUser,
        error: null,
      };
    }),
  logOut: () =>
    set({
      isLoggedIn: null,
      error: null,
    }),
}));
