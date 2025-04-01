import { createContext, useContext, ReactNode, useState } from "react";

type User = {
  token: string | null;
  isAuthenticated: boolean;
};

type AuthContextType = {
  user: User;
  login: (newToken: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    token: null,
    isAuthenticated: false,
  });

  const login = (newToken: string) => {
    setUser({
      token: newToken,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setUser({
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
