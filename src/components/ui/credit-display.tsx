import { Coins, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCredits } from "@/hooks/useCredits";

interface CreditDisplayProps {
  credits?: number;
  className?: string;
  showLabel?: boolean;
  useHook?: boolean;
}

export function CreditDisplay({
  credits: propCredits,
  className,
  showLabel = true,
  useHook = false
}: CreditDisplayProps) {
  const { credits: hookCredits, loading } = useCredits();

  // Use hook credits if useHook is true, otherwise use prop credits
  const credits = useHook ? hookCredits : (propCredits ?? 0);

  if (useHook && loading) {
    return (
      <div className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-card border border-border/50",
        className
      )}>
        <Loader2 size={18} className="text-accent animate-spin" />
        <div className="flex flex-col">
          <span className="text-lg font-bold text-foreground">--</span>
          {showLabel && (
            <span className="text-xs text-muted-foreground">créditos</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-card border border-border/50",
      className
    )}>
      <Coins size={18} className="text-accent animate-glow-pulse" />
      <div className="flex flex-col">
        <span className="text-lg font-bold text-foreground">{credits}</span>
        {showLabel && (
          <span className="text-xs text-muted-foreground">créditos</span>
        )}
      </div>
    </div>
  );
}