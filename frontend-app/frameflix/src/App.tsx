import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "./components/ui/sonner";
import { PrivateRouteWrapper } from "./components/PrivateRoute";
import { AuthContext } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";
import Movies from "./pages/Movies";
import MovieReviews from "./pages/MovieReviews";
import Collections from "./pages/Collections";
import Favorites from "./pages/Favorites";
//import Test from "./pages/Test";

const AppRoutes = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route element={<PrivateRouteWrapper token={token} />}>
        <Route path="/collections" element={<Collections />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/moviereviews" element={<MovieReviews />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
