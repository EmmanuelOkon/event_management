import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startContent?: React.ReactElement;
  endContent?: React.ReactElement;
  startContentAction?: () => void;
  endContentAction?: () => void;
  error?: boolean;
}

const startIconPadding = "pl-4 bg-transparent"; // Default padding when only StartIcon is present
const endIconPadding = "sm:pr-0 bg-transparent"; // Additional padding when only EndIcon is present
const bothIconsPadding = "pl-4 pr-0 bg-transparent"; // Padding when both StartIcon and EndIcon are present

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startContent, endContent, error, ...props }, ref) => {
    const combinedPadding =
      startContent && endContent
        ? bothIconsPadding
        : startContent
          ? startIconPadding
          : endContent
            ? endIconPadding
            : "";
    return (
      <div
        className={cn(
          "flex h-max w-full items-center rounded-none border border-[#DBDFE6] bg-white sm:text-base ring-offset-black file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grayscale-500 placeholder:text-xs focus-within:outline-0 focus-within:ring-0 focus-within:ring-black focus-within:ring-offset-1 md:focus-within:ring-offset-2  disabled:cursor-not-allowed disabled:opacity-50 text-sm",
          combinedPadding,
          {
            "border-red-600 bg-white focus-within:ring-destructive focus-visible:ring-red-500":
              error,
          },
        )}
      >
        {startContent}
        <input
          type={type}
          className={cn(
            "h-11 w-full bg-white ring-offset-background grow rounded-none px-5 py-3 focus-within:outline-0 focus-within:ring-transparent",
            className,
          )}
          ref={ref}
          {...props}
        />
        {endContent}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
