import React from "react";
import { SharedNavbar } from "./SharedNavbar";

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <SharedNavbar />

      <main className="container mx-auto px-4 py-16">
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
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Sécurité avancée
              </h3>
              <p className="text-gray-600">
                Authentification sécurisée avec JWT et gestion des rôles
                utilisateurs
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Performance optimisée
              </h3>
              <p className="text-gray-600">
                Interface rapide et réactive basée sur React et TypeScript
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Design moderne
              </h3>
              <p className="text-gray-600">
                Interface utilisateur intuitive et responsive avec Tailwind CSS
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Gestion complète
              </h3>
              <p className="text-gray-600">
                Suivi des emprunts, gestion des utilisateurs et statistiques
                détaillées
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibel text-gray-900 mb-4">
                Recherche avancée
              </h3>
              <p className="text-gray-600">
                Système de recherche puissant avec filtres et tri personnalisés
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md">
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
        </div>
      </main>
    </div>
  );
};
