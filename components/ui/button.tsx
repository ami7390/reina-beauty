import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-reina-red focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", { variants: { variant: { default: "bg-reina-red text-white shadow-lg shadow-reina-red/20 hover:-translate-y-0.5 hover:bg-reina-dark-red", outline: "border-2 border-reina-red bg-transparent text-reina-red hover:bg-reina-pink-light", light: "bg-white text-reina-red shadow-lg hover:-translate-y-0.5 hover:bg-reina-pink-light" }, size: { default: "h-11 px-6", lg: "h-14 px-7 text-base" } }, defaultVariants: { variant: "default", size: "default" } });

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) { const Comp = asChild ? Slot : "button"; return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />; }
export { Button, buttonVariants };
