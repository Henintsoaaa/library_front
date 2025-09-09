import { useAuth } from "../context/AuthContext";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-xl text-gradient animate-fade-in-up">
            Tableau de bord
          </h1>
          <p className="text-xl text-gray-600 animate-fade-in-up animation-delay-200">
            Bienvenue,{" "}
            <span className="font-semibold text-blue-600">{user?.name}</span> !
            Voici un aperçu de votre bibliothèque.
          </p>
        </div>
        {/* Main Content Grid */}
        <div className="flex-1 gap-8">
          {user?.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
          {/* Additional sections can be added here */}
        </div>
      </div>
    </div>
  );
};
