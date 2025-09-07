import React from "react";
import { Link } from "react-router-dom";

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">
                Bibliothèque
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm"
              >
                Accueil
              </Link>
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            À propos de notre Bibliothèque
          </h1>

          <div className="max-w-3xl mx-auto text-lg text-gray-600 space-y-6">
            <p>
              Notre système de gestion de bibliothèque moderne offre une
              expérience numérique complète pour la gestion des livres et des
              emprunts.
            </p>

            <p>
              Développé avec les dernières technologies web, notre plateforme
              garantit sécurité, performance et facilité d'utilisation pour tous
              nos utilisateurs.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Sécurité avancée
              </h3>
              <p className="text-gray-600">
                Authentification sécurisée avec JWT et gestion des rôles
                utilisateurs
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Performance optimisée
              </h3>
              <p className="text-gray-600">
                Interface rapide et réactive basée sur React et TypeScript
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Design moderne
              </h3>
              <p className="text-gray-600">
                Interface utilisateur intuitive et responsive avec Tailwind CSS
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Gestion complète
              </h3>
              <p className="text-gray-600">
                Suivi des emprunts, gestion des utilisateurs et statistiques
                détaillées
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibel text-gray-900 mb-4">
                Recherche avancée
              </h3>
              <p className="text-gray-600">
                Système de recherche puissant avec filtres et tri personnalisés
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Multi-plateforme
              </h3>
              <p className="text-gray-600">
                Accessible sur ordinateur, tablette et mobile avec le même
                confort
              </p>
            </div>
          </div>

          <div className="mt-16 bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Technologies utilisées
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                React
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                TypeScript
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Vite
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Tailwind CSS
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                React Router
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Axios
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                NestJS
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                JWT
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
