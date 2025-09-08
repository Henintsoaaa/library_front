import * as React from "react";
import { cn } from "../../../src/lib/utils";

type AlertVariant = "default" | "destructive" | "success" | "warning";

const getAlertVariantClasses = (variant: AlertVariant = "default") => {
  const variants = {
    default:
      "bg-gradient-to-r from-blue-50/80 to-blue-100/80 text-blue-700 border-blue-200/60 [&>svg]:text-blue-600",
    destructive:
      "bg-gradient-to-r from-red-50/80 to-red-100/80 text-red-700 border-red-200/60 [&>svg]:text-red-600",
    success:
      "bg-gradient-to-r from-green-50/80 to-green-100/80 text-green-700 border-green-200/60 [&>svg]:text-green-600",
    warning:
      "bg-gradient-to-r from-yellow-50/80 to-yellow-100/80 text-yellow-700 border-yellow-200/60 [&>svg]:text-yellow-600",
  };
  return variants[variant];
};

const getAlertIcon = (variant: AlertVariant = "default") => {
  const icons = {
    default: "ℹ️",
    destructive: "⚠️",
    success: "✅",
    warning: "⚡",
  };
  return icons[variant];
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative w-full rounded-xl border p-4 backdrop-blur-sm shadow-lg flex items-start gap-3 font-medium transition-all duration-300 hover:shadow-xl",
        getAlertVariantClasses(variant),
        className
      )}
      {...props}
    >
      <span className="text-lg flex-shrink-0 mt-0.5">
        {getAlertIcon(variant)}
      </span>
      <div className="flex-1">{children}</div>
    </div>
  )
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm leading-relaxed opacity-90", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
