import { TestAuth } from "./TestAuth";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Envolve toda a aplicação */}
      <TestAuth /> {/* Componente que usa useAuth() */}
    </AuthProvider>
  );
}

export default App;
