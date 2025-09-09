import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="modern-card p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Accès requis
            </h2>
            <p className="text-gray-600 mb-6">
              Veuillez vous connecter pour accéder à votre profil.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="btn-gradient text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-xl text-gradient animate-fade-in-up mb-4">
            Mon Profil
          </h1>
          <p className="text-lg text-gray-600 animate-fade-in-up animation-delay-200">
            Gérez vos informations personnelles et vos préférences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="modern-card p-8 animate-slide-in-left">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Informations personnelles
              </h2>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {user.name}
                    </h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <div className="bg-gray-50 px-4 py-3 rounded-xl">
                      <p className="text-gray-900 font-medium">{user.name}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="bg-gray-50 px-4 py-3 rounded-xl">
                      <p className="text-gray-900 font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rôle
                    </label>
                    <div className="bg-gray-50 px-4 py-3 rounded-xl">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Statut
                    </label>
                    <div className="bg-gray-50 px-4 py-3 rounded-xl">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Actif
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-6">
            <div className="modern-card p-6 animate-slide-in-right">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-white text-gray-700 px-4 py-3 rounded-xl font-semibold text-sm border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                  Modifier le profil
                </button>
                <button className="w-full bg-white text-gray-700 px-4 py-3 rounded-xl font-semibold text-sm border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                  Changer le mot de passe
                </button>
                <button className="w-full bg-white text-gray-700 px-4 py-3 rounded-xl font-semibold text-sm border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                  Préférences
                </button>
              </div>
            </div>

            <div className="modern-card p-6 animate-slide-in-right animation-delay-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Statistiques
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Livres empruntés</span>
                  <span className="font-bold text-gray-900">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Retours en retard</span>
                  <span className="font-bold text-gray-900">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Membre depuis</span>
                  <span className="font-bold text-gray-900">Jan 2024</span>
                </div>
              </div>
            </div>

            <div className="modern-card p-6 animate-slide-in-right animation-delay-400">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sécurité</h2>
              <button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-3 rounded-xl font-semibold text-sm shadow-lg hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
