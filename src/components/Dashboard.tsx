import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const stats = [
    {
      title: "Livres empruntés",
      value: "12",
      icon: (
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      gradient: "from-blue-500 to-purple-500",
    },
    {
      title: "Livres disponibles",
      value: "245",
      icon: (
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      gradient: "from-green-500 to-teal-500",
    },
    {
      title: "Emprunts en cours",
      value: "8",
      icon: (
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Retours aujourd'hui",
      value: "3",
      icon: (
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const recentActivities = [
    {
      action: "Emprunt",
      book: "Le Petit Prince",
      date: "2024-01-15",
      status: "En cours",
    },
    { action: "Retour", book: "1984", date: "2024-01-14", status: "Terminé" },
    {
      action: "Emprunt",
      book: "Harry Potter",
      date: "2024-01-13",
      status: "En cours",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <div className="mb-8">
          <h1 className="heading-xl text-gradient animate-fade-in-up">
            Tableau de bord
          </h1>
          <p className="text-xl text-gray-600 animate-fade-in-up animation-delay-200">
            Bienvenue,{" "}
            <span className="font-semibold text-blue-600">{user?.name}</span> !
            Voici un aperçu de votre bibliothèque.
          </p>
        </div> */}

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className={`modern-card p-6 animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`h-12 w-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          {/* <div className="lg:col-span-2">
            <div className="modern-card p-6 animate-slide-in-left">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Activités récentes
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          activity.action === "Emprunt"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {activity.action === "Emprunt" ? (
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.book}
                        </p>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activity.status === "En cours"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Quick Actions */}
          {/* <div className="space-y-6">
            <div className="modern-card p-6 animate-slide-in-right">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Actions rapides
              </h2>
              <div className="space-y-3">
                <button className="w-full btn-gradient text-white px-4 py-3 rounded-xl font-semibold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  Nouveau livre
                </button>
                <button className="w-full bg-white text-gray-700 px-4 py-3 rounded-xl font-semibold text-sm border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                  Gérer emprunts
                </button>
                <button
                  onClick={handleProfileClick}
                  className="w-full bg-white text-gray-700 px-4 py-3 rounded-xl font-semibold text-sm border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                >
                  Mon profil
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
