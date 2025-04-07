// src/components/ui/logo.tsx

import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="text-2xl font-extrabold tracking-tight">
      <span className="text-slate-800">Frame</span>
      <span className="text-teal-600">Flix</span>
    </Link>
  );
};

export default Logo;
