import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const SharedNavbar: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigation = [
    { name: "About", href: "/about" },
    { name: "Accueil", href: "/" },
  ];
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-gradient flex items-center"
            >
              📚 Bibliothèque
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            {navigation.map((item) => (
              <>
                {(item.name === "About" || item.name === "Accueil") && (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </>
            ))}
            {isAuthenticated ? (
              <>
                <span className="text-gray-600">
                  Bonjour,{" "}
                  <span className="font-semibold text-blue-600">
                    {user?.name}
                  </span>
                </span>
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200"
                >
                  Tableau de bord
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 rounded-3xl"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
