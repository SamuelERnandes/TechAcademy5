import { Link, useLocation } from "react-router-dom";
import { Film, FolderPlus, LogOut, Award, List, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
const Drawer = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[230px] bg-slate-900 text-white p-6 shadow-lg z-50">
      <h2 className="text-2xl font-bold mb-10">FrameFlix</h2>
      <nav className="flex flex-col gap-4">
        <NavItem
          to="/movies"
          icon={<Film size={20} />}
          active={isActive("/movies")}
        >
          Filmes
        </NavItem>
        <NavItem
          to="/collections"
          icon={<FolderPlus size={20} />}
          active={isActive("/collections")}
        >
          Coleções
        </NavItem>
        <NavItem
          to="/rating"
          icon={<Award size={20} />}
          active={isActive("/rating")}
        >
          Avaliações
        </NavItem>
        <NavItem
          to="/my-ratings"
          icon={<List size={20} />}
          active={isActive("/my-ratings")}
        >
          Minhas Avaliações
        </NavItem>
        <NavItem
          to="/profile"
          icon={<User size={20} />}
          active={isActive("/profile")}
        >
          Perfil
        </NavItem>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition text-slate-300 hover:bg-slate-800"
        >
          <LogOut size={20} />
          Sair
        </button>
      </nav>
    </aside>
  );
};

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active: boolean;
};

const NavItem = ({ to, icon, children, active }: NavItemProps) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
      active ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-800"
    }`}
  >
    {icon}
    {children}
  </Link>
);

export default Drawer;
