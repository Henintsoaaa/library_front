import React from "react";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  animationDelay?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  onClick,
  animationDelay = "0s",
}) => {
  return (
    <div
      className="modern-card p-8 text-center cursor-pointer interactive animate-fade-in-up"
      onClick={onClick}
      style={{ animationDelay }}
    >
      <div
        className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6 mx-auto animate-float shadow-lg"
        style={{ animationDelay: `calc(${animationDelay} + 0.3s)` }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};
