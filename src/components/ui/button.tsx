import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70",
  {
    variants: {
      variant: {
        default:
          "bg-amber-200 text-zinc-950 shadow-[0_0_30px_rgba(251,191,36,0.18)] hover:bg-amber-100",
        secondary:
          "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15",
        ghost: "text-white/80 hover:bg-white/10 hover:text-white",
      },
      size: {
        default: "h-11 px-5",
        lg: "h-12 px-6 text-sm",
        sm: "h-9 px-4 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

