import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Template } from "@/data/templateCategories";
import { ArrowRight, Star, Crown, Zap } from "lucide-react";

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

  const handleCardClick = () => {
    onSelect(template);
  };

  const getBadgeIcon = () => {
    if (isPopular) return <Star className="h-3 w-3 text-yellow-400 fill-current" />;
    // You can add more badge types like premium, featured, etc.
    return null;
  };

  return (
    <div
      className={`
        relative cursor-pointer rounded-2xl overflow-hidden
        transition-all duration-150 ease-out
        ${isPressed ? 'scale-[0.98] opacity-90' : 'scale-100 opacity-100'}
        ${className?.includes('list-view') ? 'bg-white/5 backdrop-blur-sm border border-white/10' : ''}
        ${className}
      `}
      style={style}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleCardClick}
    >
      {/* New card design following reference */}
      <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300">
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

          {/* Badge with icon in top corner */}
          {getBadgeIcon() && (
            <div className="absolute top-3 left-3">
              <div className="w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                {getBadgeIcon()}
              </div>
            </div>
          )}

          {/* Arrow icon in top right */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* Text content overlay on bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Category label */}
            <div className="mb-2">
              <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white/90">
                {categoryTitle || 'Geral'}
              </span>
            </div>

            {/* Template title */}
            <h4 className="text-white font-semibold text-base leading-tight line-clamp-2">
              {template.title}
            </h4>
          </div>
        </div>

      </div>
    </div>
  );
}