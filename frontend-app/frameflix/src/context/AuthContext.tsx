import { jwtDecode } from "jwt-decode";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

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
  isAuthLoading: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthLoading(false);
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      const normalizedUser: User = {
        id: decoded.id_user || decoded.id,
        name: decoded.name,
        cpf: decoded.cpf,
        email: decoded.email,
      };

      setUser(normalizedUser);
      setAuthenticated(true);
    } catch (error) {
      console.error("Token inválido", error);
      localStorage.removeItem("token");
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

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
    <AuthContext.Provider
      value={{ user, login, logout, authenticated, isAuthLoading }}
    >
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
