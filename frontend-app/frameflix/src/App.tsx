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
import Rating from "./pages/Rating";
import MyRatings from "./pages/MyRatings";
import UserProfile from "./pages/UserProfile";
//import Test from "./pages/Test";

const AppRoutes = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route element={<PrivateRouteWrapper token={token} />}>
        <Route path="/collections" element={<Collections />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/moviereviews" element={<MovieReviews />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/movies/:id/rating" element={<Rating />} />
        <Route path="/my-ratings" element={<MyRatings />} />
        <Route path="/profile" element={<UserProfile />} />
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
