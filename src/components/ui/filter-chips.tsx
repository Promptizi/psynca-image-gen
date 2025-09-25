import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X, Briefcase, Home, Stethoscope } from "lucide-react";
import { ReactNode } from "react";

interface FilterChip {
  label: string;
  value: string;
  color: string;
  icon?: ReactNode;
}

interface FilterChipsProps {
  filters: FilterChip[];
  activeFilters: string[];
  onFilterToggle: (value: string) => void;
  onClearAll?: () => void;
}

const getFilterIcon = (value: string): ReactNode => {
  const iconMap: Record<string, ReactNode> = {
    'professional': <Briefcase className="h-3 w-3" />,
    'therapy-office': <Home className="h-3 w-3" />,
    'specialized-practice': <Stethoscope className="h-3 w-3" />,
    'wellness-mindfulness': <Home className="h-3 w-3" />,
  };
  return iconMap[value];
};

const getFilterColors = (value: string, isActive: boolean) => {
  const colorMap: Record<string, { active: string; inactive: string }> = {
    'professional': {
      active: 'bg-primary/40 border-primary/50 text-primary-foreground',
      inactive: 'bg-primary/10 border-primary/20 text-muted-foreground hover:bg-primary/20'
    },
    'therapy-office': {
      active: 'bg-accent/40 border-accent/50 text-accent-foreground',
      inactive: 'bg-accent/10 border-accent/20 text-muted-foreground hover:bg-accent/20'
    },
    'specialized-practice': {
      active: 'bg-primary/40 border-primary/50 text-primary-foreground',
      inactive: 'bg-primary/10 border-primary/20 text-muted-foreground hover:bg-primary/20'
    },
    'wellness-mindfulness': {
      active: 'bg-accent/40 border-accent/50 text-accent-foreground',
      inactive: 'bg-accent/10 border-accent/20 text-muted-foreground hover:bg-accent/20'
    },
  };

  return isActive ? colorMap[value]?.active || 'bg-card/20' : colorMap[value]?.inactive || 'bg-card/10';
};

export function FilterChips({ filters, activeFilters, onFilterToggle, onClearAll }: FilterChipsProps) {

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll();
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center relative">
      <span className="text-muted-foreground text-sm font-medium mr-2">Filtros:</span>

      {filters.map((filter) => {
        const isActive = activeFilters.includes(filter.value);
        const colors = getFilterColors(filter.value, isActive);

        return (
          <Badge
            key={filter.value}
            variant="secondary"
            className={`
              cursor-pointer transition-all duration-150
              backdrop-blur-sm border px-3 py-1.5 rounded-full
              flex items-center gap-1.5 text-xs font-medium
              ${colors}
            `}
            onClick={() => onFilterToggle(filter.value)}
          >
            {getFilterIcon(filter.value)}
            {filter.label}
            {isActive && (
              <X className="h-3 w-3 ml-1 opacity-80 hover:opacity-100" />
            )}
          </Badge>
        );
      })}

      {activeFilters.length > 0 && onClearAll && (
        <Badge
          variant="outline"
          className="
            cursor-pointer transition-all duration-150
            bg-destructive/20 border-destructive/30 text-destructive-foreground hover:bg-destructive/30
            px-3 py-1.5 rounded-full text-xs
          "
          onClick={handleClearAll}
        >
          <div className="flex items-center gap-1">
            <X className="h-3 w-3" />
            <span>Limpar todos ({activeFilters.length})</span>
          </div>
        </Badge>
      )}

    </div>
  );
}