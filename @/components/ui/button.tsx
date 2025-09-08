import * as React from "react";
import { cn } from "../../../src/lib/utils";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "success"
  | "warning";
type ButtonSize = "default" | "sm" | "lg" | "icon";

const getButtonVariantClasses = (variant: ButtonVariant = "default") => {
  const variants = {
    default:
      "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:-translate-y-1",
    destructive:
      "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:-translate-y-1",
    outline:
      "border-2 border-blue-500 bg-white/90 backdrop-blur-sm text-blue-600 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:-translate-y-1",
    secondary:
      "bg-white/90 backdrop-blur-sm text-slate-600 border border-slate-200 hover:bg-white hover:shadow-md hover:-translate-y-1",
    ghost: "hover:bg-blue-50 hover:text-blue-600 hover:shadow-md",
    link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700",
    success:
      "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:-translate-y-1",
    warning:
      "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:from-yellow-600 hover:to-orange-600 hover:shadow-xl hover:-translate-y-1",
  };
  return variants[variant];
};

const getButtonSizeClasses = (size: ButtonSize = "default") => {
  const sizes = {
    default: "h-12 px-6 py-3",
    sm: "h-9 rounded-md px-3 text-xs",
    lg: "h-14 rounded-lg px-8 text-base",
    icon: "h-10 w-10",
  };
  return sizes[size];
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700";

    const variantClasses = getButtonVariantClasses(variant);
    const sizeClasses = getButtonSizeClasses(size);

    return (
      <button
        className={cn(baseClasses, variantClasses, sizeClasses, className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
