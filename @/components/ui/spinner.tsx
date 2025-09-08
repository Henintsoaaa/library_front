import * as React from "react";
import { cn } from "../../../src/lib/utils";

type SpinnerSize = "sm" | "md" | "lg";

const getSpinnerSizeClasses = (size: SpinnerSize = "md") => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };
  return sizes[size];
};

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-block animate-spin rounded-full border-2 border-transparent border-t-blue-500 border-r-blue-500",
          getSpinnerSizeClasses(size),
          className
        )}
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);
Spinner.displayName = "Spinner";

const LoadingSpinner = ({
  size = "md",
  text = "Chargement...",
}: {
  size?: SpinnerSize;
  text?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <Spinner size={size} />
        <div className="absolute inset-0 animate-pulse">
          <Spinner
            size={size}
            className="border-t-blue-300 border-r-blue-300 opacity-50"
          />
        </div>
      </div>
      {text && (
        <p className="text-sm font-medium text-slate-600 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export { Spinner, LoadingSpinner };
