import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const SharedNavbar: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = [
    { name: "About", href: "/about" },
    { name: "Accueil", href: "/" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-gradient flex items-center"
            >
              📚 BiblioTech
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 0 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 0 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 0 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <>
                  {(item.name === "About" || item.name === "Accueil") && (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </>
              ))}
              {isAuthenticated ? (
                <>
                  <div className="text-gray-600 px-2 py-1">
                    Bonjour,{" "}
                    <span className="font-semibold text-blue-600">
                      {user?.name}
                    </span>
                  </div>
                  <Link
                    to="/dashboard"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tableau de bord
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 rounded-3xl text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
