import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useContext, useState } from "react";

type User = {
  id: number | string;
  name?: string;
  cpf?: string;
  email?: string;
};

type AuthContextData = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  authenticated: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    return {
      id: decoded.id_user || decoded.id,
      name: decoded.name,
      cpf: decoded.cpf,
      email: decoded.email,
    };
  });

  const [authenticated, setAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const login = (token: string) => {
    const decoded: any = jwtDecode(token);
    const normalizedUser: User = {
      id: decoded.id_user || decoded.id,
      name: decoded.name,
      cpf: decoded.cpf,
      email: decoded.email,
    };

    localStorage.setItem("token", token);
    setUser(normalizedUser);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export { AuthContext };
export default AuthContext;
