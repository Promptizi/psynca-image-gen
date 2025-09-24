import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreditDisplayProps {
  credits: number;
  className?: string;
  showLabel?: boolean;
}

export function CreditDisplay({ credits, className, showLabel = true }: CreditDisplayProps) {
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