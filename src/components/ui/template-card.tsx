import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Template } from "@/data/templateCategories";
import { ArrowRight, Star, Crown, Zap, Sparkles, Heart } from "lucide-react";

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
  isPopular?: boolean;
  className?: string;
  style?: React.CSSProperties;
  categoryTitle?: string;
}

export function TemplateCard({ template, onSelect, isPopular = false, className = "", style, categoryTitle }: TemplateCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  // Add sparkle effect occasionally
  useEffect(() => {
    if (isPopular) {
      const interval = setInterval(() => {
        setShowSparkle(true);
        setTimeout(() => setShowSparkle(false), 1000);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPopular]);

  const handleCardClick = () => {
    onSelect(template);
  };

  const getBadgeIcon = () => {
    if (isPopular) return (
      <div className="relative">
        <Star className="h-3 w-3 text-yellow-400 fill-current animate-pulse" />
        {showSparkle && (
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2">
            <Sparkles className="h-2 w-2 text-yellow-200 animate-magic-sparkle" />
          </div>
        )}
      </div>
    );
    return null;
  };

  return (
    <div
      className={`
        relative cursor-pointer rounded-2xl overflow-hidden
        transition-all duration-300 ease-out will-change-transform
        ${isPressed ? 'scale-[0.96] opacity-90' : isHovered ? 'scale-[1.02] -translate-y-1' : 'scale-100 translate-y-0'}
        ${className?.includes('list-view') ? 'bg-white/5 backdrop-blur-sm border border-white/10' : ''}
        ${className}
      `}
      style={style}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsPressed(false);
        setIsHovered(false);
      }}
      onClick={handleCardClick}
    >
      {/* Enhanced card design with delightful interactions */}
      <div className={`relative bg-card/50 backdrop-blur-sm border rounded-2xl overflow-hidden group transition-all duration-300 ${
        isHovered
          ? 'border-primary/60 shadow-glow bg-card/70'
          : 'border-border/50'
      }`}>
        {/* Image with overlay and text on top */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/50" />
          )}

          <img
            src={template.image}
            alt={template.title}
            onLoad={() => setImageLoaded(true)}
            className={`
              w-full h-full object-cover
              transition-opacity duration-300
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
          />

          {/* Gradient overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Enhanced badge with icon in top corner */}
          {getBadgeIcon() && (
            <div className="absolute top-3 left-3 z-10">
              <div className={`w-8 h-8 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                isPopular
                  ? 'bg-gradient-to-br from-yellow-400/40 to-orange-400/40 animate-glow-pulse'
                  : 'bg-black/40'
              }`}>
                {getBadgeIcon()}
              </div>
            </div>
          )}

          {/* Enhanced arrow icon with smooth transitions */}
          <div className={`absolute top-3 right-3 z-10 transition-all duration-300 ${
            isHovered
              ? 'opacity-100 scale-110 rotate-12'
              : 'opacity-0 scale-90 rotate-0'
          }`}>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 backdrop-blur-sm rounded-full flex items-center justify-center shadow-button animate-pulse">
              <ArrowRight className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* Enhanced text content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            {/* Category label with hover effect */}
            <div className="mb-2">
              <span className={`inline-block px-2 py-1 backdrop-blur-sm rounded-full text-xs font-medium transition-all duration-300 ${
                isHovered
                  ? 'bg-primary/30 text-white scale-105'
                  : 'bg-white/20 text-white/90'
              }`}>
                {categoryTitle || 'Geral'}
              </span>
            </div>

            {/* Template title with typing animation effect when hovered */}
            <h4 className={`text-white font-semibold text-base leading-tight line-clamp-2 transition-all duration-300 ${
              isHovered ? 'scale-105 text-shadow' : ''
            }`}>
              {template.title}
            </h4>

            {/* Subtle hint text that appears on hover */}
            <p className={`text-white/60 text-xs mt-1 transition-all duration-300 overflow-hidden ${
              isHovered
                ? 'max-h-10 opacity-100'
                : 'max-h-0 opacity-0'
            }`}>
              Clique para usar este template
            </p>
          </div>

          {/* Magical sparkles that appear on hover */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/60 rounded-full animate-magic-sparkle" />
              <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-primary/40 rounded-full animate-magic-sparkle" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-1/3 left-1/5 w-0.5 h-0.5 bg-yellow-400/60 rounded-full animate-magic-sparkle" style={{ animationDelay: '1s' }} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}