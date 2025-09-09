import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const About = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="mx-auto h-24 w-24 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-8 animate-float shadow-xl">
            <svg
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="heading-xl text-gradient animate-fade-in-up mb-4">
            À propos de BiblioTech
          </h1>
          <p className="text-xl text-gray-600 animate-fade-in-up animation-delay-200">
            Système de gestion de bibliothèque moderne et intuitif
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="modern-card p-8 animate-slide-in-left">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Authentification Sécurisée
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Système d'authentification robuste avec gestion des rôles
              utilisateur, assurant la sécurité de vos données et une expérience
              personnalisée.
            </p>
          </div>

          <div className="modern-card p-8 animate-slide-in-right">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Gestion des Livres
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Interface intuitive pour gérer votre collection de livres, avec
              recherche avancée et organisation par catégories.
            </p>
          </div>

          <div className="modern-card p-8 animate-slide-in-left animation-delay-400">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Suivi des Emprunts
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Système complet de gestion des emprunts avec dates d'échéance,
              rappels automatiques et historique des transactions.
            </p>
          </div>

          <div className="modern-card p-8 animate-slide-in-right animation-delay-400">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Performance Optimisée
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Application rapide et responsive, conçue avec les dernières
              technologies pour une expérience utilisateur fluide.
            </p>
          </div>
        </div>

        <div className="modern-card p-8 text-center animate-fade-in-up animation-delay-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-gray-600 mb-6">
            Rejoignez des milliers d'utilisateurs qui font confiance à
            BiblioTech pour gérer leur bibliothèque.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="btn-gradient text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              onClick={
                isAuthenticated ? handleDashboardClick : handleLoginClick
              }
            >
              Commencer maintenant
            </button>
            <button
              className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
              onClick={
                isAuthenticated ? handleDashboardClick : handleLoginClick
              }
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
