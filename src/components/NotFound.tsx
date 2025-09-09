import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[70vh]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl flex items-center justify-center mb-8 animate-bounce-in">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h2 className="heading-lg text-gradient animate-fade-in-up mb-4">
            Page non trouvée
          </h2>

          <p className="text-lg text-gray-600 animate-fade-in-up animation-delay-200 mb-8">
            La page que vous cherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="animate-fade-in-up animation-delay-400">
          <div className="modern-card p-8">
            <div className="text-center space-y-6">
              <div className="text-9xl font-bold text-gray-300 animate-pulse">
                404
              </div>

              <p className="text-xl text-gray-600">
                Oups ! Cette page semble introuvable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="btn-gradient text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Retour à l'accueil
                </Link>
                <Link
                  to="/dashboard"
                  className="bg-white text-gray-700 px-6 py-4 rounded-xl font-semibold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                >
                  Tableau de bord
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
