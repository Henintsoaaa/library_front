import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import type { User } from "../types/auth.type";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    // Logic to fetch and set user profile
    if (user) {
      setProfile(user);
      navigate("/profile");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p onClick={handleProfileClick}>Welcome, {user?.name}!</p>
      <p>Your role: {user?.role}</p>
    </div>
  );
};
