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
  logOut: () => void;
}

function getUsersFromStorage(): UserProps[] {
  try {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
}

function getLoggedInFromStorage(): UserProps | null {
  try {
    const loggedIn = localStorage.getItem("isLoggedIn");
    return loggedIn ? JSON.parse(loggedIn) : null;
  } catch {
    return null;
  }
}

export const useAuthStore = create<AuthStoreProps>((set) => ({
  users: getUsersFromStorage(),
  isLoggedIn: getLoggedInFromStorage(),
  error: null,
  signUp: (newUser) =>
    set((state) => {
      const usernameExists = state.users.some(
        (u) => u.username === newUser.username
      );
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
