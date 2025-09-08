import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SharedNavbar } from "./SharedNavbar";

export const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <SharedNavbar />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
            Bienvenue dans notre Bibliothèque
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Découvrez une vaste collection de livres, gérez vos emprunts et
            profitez d'une expérience de lecture enrichissante dans notre
            bibliothèque moderne.
          </p>

          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-slide-in-left">
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg px-8 py-4 h-14 w-60 rounded-3xl font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 inline-flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Créer un compte
              </Link>
              <Link
                to="/login"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-3xl h-14 w-56 font-semibold hover:bg-blue-50 transition-all duration-200 text-lg flex items-center justify-center "
              >
                Se connecter
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-bounce-in">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div className="text-6xl mb-6">📚</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Vaste Collection
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Accédez à des milliers de livres dans tous les genres : fiction,
                science, histoire, art et bien plus encore.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div className="text-6xl mb-6">⏰</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Gestion Simplifiée
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Gérez facilement vos emprunts, réservations et consultez
                l'historique de vos lectures en quelques clics.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Recherche Avancée
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Trouvez rapidement les livres qui vous intéressent grâce à notre
                système de recherche intelligent.
              </p>
            </div>
          </div>

          <div className="mt-20 animate-slide-in-right">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Pourquoi choisir notre bibliothèque ?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Interface moderne
                    </h3>
                    <p className="text-gray-600">
                      Une expérience utilisateur fluide et intuitive
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Disponibilité 24/7
                    </h3>
                    <p className="text-gray-600">
                      Accès en ligne à votre compte à tout moment
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Notifications automatiques
                    </h3>
                    <p className="text-gray-600">
                      Rappels pour les dates de retour
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Support personnalisé
                    </h3>
                    <p className="text-gray-600">
                      Une équipe dédiée pour vous accompagner
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
