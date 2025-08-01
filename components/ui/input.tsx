import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = React.useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          type === "password" && "pr-10",
          className
        )}
        {...props}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label={showPassword ? "Nascondi password" : "Mostra password"}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
}

export { Input };
