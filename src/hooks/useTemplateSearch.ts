import { useState, useMemo } from 'react';
import { templateCategories, Template, TemplateCategory } from '@/data/templateCategories';

export interface FilterOptions {
  searchQuery: string;
  activeCategories: string[];
  tags: string[];
}

export function useTemplateSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Gerar tags dos templates para filtros
  const availableTags = useMemo(() => {
    const tags = new Set<string>();

    templateCategories.forEach(category => {
      category.templates.forEach(template => {
        // Extrair tags do título e prompt
        const titleWords = template.title.toLowerCase().split(' ');
        const promptWords = template.prompt.toLowerCase().split(' ');

        // Tags comuns baseadas no conteúdo
        if (template.prompt.includes('professional') || template.title.includes('Professional')) {
          tags.add('corporate');
        }
        if (template.prompt.includes('linkedin') || template.title.includes('LinkedIn')) {
          tags.add('linkedin');
        }
        if (template.prompt.includes('casual') || template.title.includes('Casual')) {
          tags.add('casual');
        }
        if (template.prompt.includes('executive') || template.title.includes('Executive')) {
          tags.add('executive');
        }
        if (template.prompt.includes('therapy') || template.title.includes('Therapy')) {
          tags.add('therapy');
        }
        if (template.prompt.includes('office') || template.title.includes('Office')) {
          tags.add('office');
        }
        if (template.prompt.includes('wellness') || template.title.includes('Wellness')) {
          tags.add('wellness');
        }
        if (template.prompt.includes('mindfulness') || template.title.includes('Mindfulness')) {
          tags.add('mindfulness');
        }
      });
    });

    return Array.from(tags).map(tag => ({
      label: tag.charAt(0).toUpperCase() + tag.slice(1),
      value: tag
    }));
  }, []);

  // Filtrar templates
  const filteredCategories = useMemo(() => {
    return templateCategories.map(category => {
      const categorySlug = category.title.toLowerCase().replace(/\s+/g, '-');

      // Filtrar por categoria selecionada
      if (activeCategory && activeCategory !== categorySlug) {
        return { ...category, templates: [] };
      }

      // Filtrar templates dentro da categoria
      const filteredTemplates = category.templates.filter(template => {
        // Filtro de busca por texto
        const matchesSearch = !searchQuery ||
          template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.prompt.toLowerCase().includes(searchQuery.toLowerCase());

        // Filtro por tags
        const matchesTags = activeTags.length === 0 || activeTags.some(tag =>
          template.title.toLowerCase().includes(tag) ||
          template.prompt.toLowerCase().includes(tag)
        );

        return matchesSearch && matchesTags;
      });

      return {
        ...category,
        templates: filteredTemplates
      };
    }).filter(category => category.templates.length > 0);
  }, [searchQuery, activeCategory, activeTags]);

  // Contar total de templates filtrados
  const totalFilteredTemplates = useMemo(() => {
    return filteredCategories.reduce((total, category) => total + category.templates.length, 0);
  }, [filteredCategories]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryToggle = (categorySlug: string) => {
    // Se clicar na mesma categoria, desseleciona
    // Se clicar em outra categoria, seleciona ela
    setActiveCategory(prev => prev === categorySlug ? null : categorySlug);
  };

  const handleTagToggle = (tag: string) => {
    setActiveTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveCategory(null);
    setActiveTags([]);
  };

  const hasActiveFilters = searchQuery.length > 0 || activeCategory !== null || activeTags.length > 0;

  return {
    searchQuery,
    activeCategory,
    activeCategories: activeCategory ? [activeCategory] : [], // Para compatibilidade
    activeTags,
    availableTags,
    filteredCategories,
    totalFilteredTemplates,
    hasActiveFilters,
    handleSearch,
    handleCategoryToggle,
    handleTagToggle,
    clearAllFilters
  };
}