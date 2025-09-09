import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <h1>Welcome to BiblioTech</h1>
      <p>Library management system.</p>
      {!isAuthenticated ? (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <div>
          <Link to="/dashboard">Go to Dashboard</Link>
        </div>
      )}
    </div>
  );
};
