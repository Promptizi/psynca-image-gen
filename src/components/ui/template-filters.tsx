import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Filter, ChevronDown } from "lucide-react";
import { useState } from "react";
import { TemplateFilters as FilterOptions } from "@/data/templateCategories";

interface TemplateFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  totalResults: number;
}

export function TemplateFilters({ filters, onFiltersChange, totalResults }: TemplateFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const genderOptions = [
    { value: 'male', label: '👨‍⚕️ Masculino', emoji: '👨‍⚕️' },
    { value: 'female', label: '👩‍⚕️ Feminino', emoji: '👩‍⚕️' },
    { value: 'unisex', label: '👥 Unissex', emoji: '👥' }
  ] as const;

  const styleOptions = [
    { value: 'formal', label: '👔 Formal', emoji: '👔' },
    { value: 'business-casual', label: '👕 Business Casual', emoji: '👕' },
    { value: 'creative', label: '🎨 Criativo', emoji: '🎨' },
    { value: 'clinical', label: '🩺 Clínico', emoji: '🩺' }
  ] as const;

  const scenarioOptions = [
    { value: 'studio', label: '📸 Estúdio', emoji: '📸' },
    { value: 'office', label: '🏢 Escritório', emoji: '🏢' },
    { value: 'home', label: '🏠 Casa', emoji: '🏠' },
    { value: 'outdoor', label: '🌅 Externo', emoji: '🌅' }
  ] as const;

  const handleFilterChange = (key: keyof FilterOptions, value: string | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value === filters[key] ? undefined : value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = filters.gender || filters.style || filters.scenario;
  const activeFiltersCount = [filters.gender, filters.style, filters.scenario].filter(Boolean).length;

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <Button
        variant={hasActiveFilters ? "default" : "outline"}
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 ${
          hasActiveFilters
            ? 'bg-gradient-primary text-white border-0 shadow-button'
            : 'border-border/50 hover:border-primary/50'
        }`}
      >
        <Filter className="h-4 w-4" />
        Filtros
        {activeFiltersCount > 0 && (
          <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
            {activeFiltersCount}
          </span>
        )}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* Filter Panel */}
      {isOpen && (
        <Card className="absolute top-full right-0 mt-2 p-4 w-80 z-50 border border-border/50 shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Filtros Avançados</h3>
              <span className="text-sm text-muted-foreground">
                {totalResults} templates
              </span>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Gênero
              </label>
              <div className="grid grid-cols-3 gap-1">
                {genderOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={filters.gender === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('gender', option.value)}
                    className={`text-xs h-8 ${
                      filters.gender === option.value
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <span className="mr-1">{option.emoji}</span>
                    {option.value === 'male' ? 'Masc' :
                     option.value === 'female' ? 'Fem' : 'Todos'}
                  </Button>
                ))}
              </div>
            </div>

            {/* Style Filter */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Estilo
              </label>
              <div className="grid grid-cols-2 gap-1">
                {styleOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={filters.style === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('style', option.value)}
                    className={`text-xs h-8 ${
                      filters.style === option.value
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <span className="mr-1">{option.emoji}</span>
                    {option.value === 'formal' ? 'Formal' :
                     option.value === 'business-casual' ? 'Casual' :
                     option.value === 'creative' ? 'Criativo' : 'Clínico'}
                  </Button>
                ))}
              </div>
            </div>

            {/* Scenario Filter */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Cenário
              </label>
              <div className="grid grid-cols-2 gap-1">
                {scenarioOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={filters.scenario === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('scenario', option.value)}
                    className={`text-xs h-8 ${
                      filters.scenario === option.value
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <span className="mr-1">{option.emoji}</span>
                    {option.value === 'studio' ? 'Estúdio' :
                     option.value === 'office' ? 'Escritório' :
                     option.value === 'home' ? 'Casa' : 'Externo'}
                  </Button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="pt-2 border-t border-border/50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    clearAllFilters();
                    setIsOpen(false);
                  }}
                  className="w-full text-muted-foreground hover:text-foreground"
                >
                  Limpar todos os filtros
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}