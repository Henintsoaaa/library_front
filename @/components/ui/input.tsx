import * as React from "react";
import { cn } from "../../../src/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border-2 border-transparent bg-white/90 backdrop-blur-sm px-4 py-3 text-sm font-medium text-slate-900 transition-all duration-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:bg-white/95 focus-visible:shadow-lg focus-visible:shadow-blue-200/40 focus-visible:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 hover:border-blue-300 hover:bg-white/95 hover:shadow-md",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
