import { create } from "zustand";

interface UserProps {
  username: string;
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
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn") || "null"),
  error: null,
  signUp: (newUser) =>
    set((state) => {
      const usernameExists = state.users.some((u) => u.username === newUser.username);
      const emailExists = state.users.some((u) => u.email === newUser.email);

      if (usernameExists) {
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
          u.username === credentials.username &&
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
