import * as React from "react";
import { cn } from "../../../src/lib/utils";

type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "success"
  | "warning";

const getBadgeVariantClasses = (variant: BadgeVariant = "default") => {
  const variants = {
    default:
      "border-transparent bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:from-blue-600 hover:to-blue-700",
    secondary:
      "border-transparent bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 shadow-md hover:from-slate-200 hover:to-slate-300",
    destructive:
      "border-transparent bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:from-red-600 hover:to-red-700",
    outline:
      "text-slate-700 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-slate-50",
    success:
      "border-transparent bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:from-green-600 hover:to-green-700",
    warning:
      "border-transparent bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md hover:from-yellow-600 hover:to-orange-600",
  };
  return variants[variant];
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105 hover:shadow-lg",
        getBadgeVariantClasses(variant),
        className
      )}
      {...props}
    />
  );
}

export { Badge };
