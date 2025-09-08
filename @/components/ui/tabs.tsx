import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "../../../src/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "relative inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-white/90 via-slate-50/95 to-white/90 dark:from-slate-800/90 dark:via-slate-900/95 dark:to-slate-800/90 backdrop-blur-sm p-1.5 text-slate-600 dark:text-slate-400 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/60 dark:border-slate-700/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200/20 dark:hover:shadow-blue-900/20",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex items-center justify-center whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold ring-offset-background transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gradient-to-r hover:from-white/90 hover:to-slate-50/90 dark:hover:from-slate-600/90 dark:hover:to-slate-700/90 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-50 data-[state=active]:via-white data-[state=active]:to-blue-50 dark:data-[state=active]:from-blue-950/70 dark:data-[state=active]:via-slate-800 dark:data-[state=active]:to-blue-950/70 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300 data-[state=active]:shadow-xl data-[state=active]:shadow-blue-200/40 dark:data-[state=active]:shadow-blue-900/40 data-[state=active]:border data-[state=active]:border-blue-200/60 dark:data-[state=active]:border-blue-700/60 data-[state=active]:scale-[1.03] data-[state=active]:-translate-y-1 before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 transition-all duration-700 ease-out transform opacity-0 translate-y-4 scale-95 data-[state=active]:opacity-100 data-[state=active]:translate-y-0 data-[state=active]:scale-100 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
