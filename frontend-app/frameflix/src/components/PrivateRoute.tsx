import { Navigate, Outlet } from "react-router-dom";
import Drawer from "./ui/drawer";
type PrivateRouteProps = {
  token: string | null;
  redirectPath?: string;
};

export const PrivateRouteWrapper = ({
  token,
  redirectPath = "/",
}: PrivateRouteProps) => {
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="flex flex-1 bg-slate-100 w-screen h-screen">
      <Drawer />
      <div className="flex flex-col flex-1 ml-[230px]">
        <Outlet />
      </div>
    </div>
  );
};
