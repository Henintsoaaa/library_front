import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function MainApp() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
