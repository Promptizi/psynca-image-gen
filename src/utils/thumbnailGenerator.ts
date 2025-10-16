// Sistema de geração de thumbnails fictícias para templates
// Cria representações visuais únicas para cada estilo de template

export interface ThumbnailConfig {
  background: string;
  accent: string;
  textColor: string;
  elements: string[];
  style: 'corporate' | 'healthcare' | 'creative' | 'academic' | 'lifestyle' | 'studio';
}

// Configurações visuais para cada categoria de template
const categoryConfigs: Record<string, ThumbnailConfig> = {
  'corporate': {
    background: 'linear-gradient(135deg, #1e293b 0%, #374151 100%)',
    accent: '#3b82f6',
    textColor: '#ffffff',
    elements: ['suit', 'building', 'chart'],
    style: 'corporate'
  },
  'healthcare': {
    background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
    accent: '#10b981',
    textColor: '#ffffff',
    elements: ['stethoscope', 'plant', 'chair'],
    style: 'healthcare'
  },
  'creative': {
    background: 'linear-gradient(135deg, #6f41b4 0%, #a687d4 100%)',
    accent: '#c7b4e4',
    textColor: '#ffffff',
    elements: ['brush', 'laptop', 'lightbulb'],
    style: 'creative'
  },
  'academic': {
    background: 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)',
    accent: '#6366f1',
    textColor: '#ffffff',
    elements: ['book', 'graduation', 'microscope'],
    style: 'academic'
  },
  'lifestyle': {
    background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
    accent: '#06b6d4',
    textColor: '#ffffff',
    elements: ['yoga', 'plant', 'home'],
    style: 'lifestyle'
  },
  'studio': {
    background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
    accent: '#e5e7eb',
    textColor: '#ffffff',
    elements: ['camera', 'light', 'frame'],
    style: 'studio'
  }
};

// Configurações específicas para cada template
const templateConfigs: Record<string, Partial<ThumbnailConfig> & { category: string }> = {
  // Corporate Executive
  'executive-bw-portrait': {
    category: 'corporate',
    background: 'linear-gradient(135deg, #000000 0%, #374151 100%)',
    accent: '#9ca3af',
    elements: ['suit', 'tie', 'office']
  },
  'business-formal-suit': {
    category: 'corporate',
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    elements: ['suit', 'handshake', 'building']
  },
  'corporate-leadership': {
    category: 'corporate',
    background: 'linear-gradient(135deg, #7c2d12 0%, #dc2626 100%)',
    accent: '#fbbf24',
    elements: ['crown', 'team', 'presentation']
  },
  'linkedin-professional': {
    category: 'corporate',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    accent: '#0ea5e9',
    elements: ['network', 'profile', 'connection']
  },

  // Healthcare Professional
  'therapist-consultation': {
    category: 'healthcare',
    background: 'linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 100%)',
    textColor: '#065f46',
    accent: '#10b981',
    elements: ['chair', 'plant', 'calm']
  },
  'clinical-psychologist': {
    category: 'healthcare',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%)',
    textColor: '#14532d',
    accent: '#059669',
    elements: ['clipboard', 'brain', 'certificate']
  },
  'wellness-practitioner': {
    category: 'healthcare',
    background: 'linear-gradient(135deg, #f0fdfa 0%, #a7f3d0 100%)',
    textColor: '#064e3b',
    accent: '#14b8a6',
    elements: ['lotus', 'balance', 'wellness']
  },
  'pediatric-specialist': {
    category: 'healthcare',
    background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)',
    textColor: '#78350f',
    accent: '#f59e0b',
    elements: ['toy', 'smile', 'colorful']
  },

  // Creative Business
  'coworking-professional': {
    category: 'creative',
    background: 'linear-gradient(135deg, #f3e8ff 0%, #c084fc 100%)',
    textColor: '#581c87',
    accent: '#8b5cf6',
    elements: ['laptop', 'coffee', 'collaboration']
  },
  'startup-founder': {
    category: 'creative',
    background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)',
    textColor: '#78350f',
    accent: '#f59e0b',
    elements: ['rocket', 'idea', 'growth']
  },
  'design-consultant': {
    category: 'creative',
    background: 'linear-gradient(135deg, #ded2ef 0%, #a687d4 100%)',
    textColor: '#322154',
    accent: '#6f41b4',
    elements: ['palette', 'sketch', 'creative']
  },
  'freelancer-creative': {
    category: 'creative',
    background: 'linear-gradient(135deg, #ede9fe 0%, #a78bfa 100%)',
    textColor: '#5b21b6',
    accent: '#8b5cf6',
    elements: ['freelance', 'freedom', 'creative']
  },

  // Academic Consulting
  'university-professor': {
    category: 'academic',
    background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
    accent: '#94a3b8',
    elements: ['book', 'teaching', 'wisdom']
  },
  'research-consultant': {
    category: 'academic',
    background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)',
    accent: '#38bdf8',
    elements: ['data', 'research', 'analysis']
  },
  'educational-director': {
    category: 'academic',
    background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)',
    accent: '#a5b4fc',
    elements: ['leadership', 'education', 'vision']
  },
  'training-specialist': {
    category: 'academic',
    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    accent: '#a7f3d0',
    elements: ['training', 'development', 'growth']
  },

  // Lifestyle Professional
  'home-office-wellness': {
    category: 'lifestyle',
    background: 'linear-gradient(135deg, #ecfef9 0%, #a7f3d0 100%)',
    textColor: '#064e3b',
    accent: '#10b981',
    elements: ['home', 'wellness', 'balance']
  },
  'mindfulness-coach': {
    category: 'lifestyle',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #86efac 100%)',
    textColor: '#14532d',
    accent: '#22c55e',
    elements: ['meditation', 'peace', 'zen']
  },
  'life-balance-coach': {
    category: 'lifestyle',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #7dd3fc 100%)',
    textColor: '#0c4a6e',
    accent: '#0284c7',
    elements: ['balance', 'harmony', 'coaching']
  },
  'holistic-practitioner': {
    category: 'lifestyle',
    background: 'linear-gradient(135deg, #fefce8 0%, #fde047 100%)',
    textColor: '#713f12',
    accent: '#eab308',
    elements: ['holistic', 'nature', 'healing']
  },

  // Studio Portraits
  'classic-studio-portrait': {
    category: 'studio',
    background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
    textColor: '#1e293b',
    accent: '#64748b',
    elements: ['classic', 'elegant', 'timeless']
  },
  'dramatic-lighting-portrait': {
    category: 'studio',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    accent: '#fbbf24',
    elements: ['drama', 'light', 'shadow']
  },
  'minimalist-headshot': {
    category: 'studio',
    background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
    textColor: '#334155',
    accent: '#64748b',
    elements: ['minimal', 'clean', 'simple']
  },
  'artistic-profile-portrait': {
    category: 'studio',
    background: 'linear-gradient(135deg, #422006 0%, #a16207 100%)',
    accent: '#fbbf24',
    elements: ['artistic', 'profile', 'creative']
  }
};

export class ThumbnailGenerator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 400;
    this.canvas.height = 500;
    this.ctx = this.canvas.getContext('2d')!;

    if (!this.ctx) {
      throw new Error('Cannot create canvas context');
    }
  }

  generateThumbnail(templateId: string, title: string): string {
    const config = this.getTemplateConfig(templateId, title);

    // Clear canvas
    this.ctx.clearRect(0, 0, 400, 500);

    // Create realistic background gradient
    this.drawRealisticGradient(config);

    // Draw a realistic person silhouette/portrait
    this.drawRealisticPortrait(config, templateId);

    // Add professional styling elements
    this.drawProfessionalStyling(config, templateId);

    // Add subtle template title
    this.drawTemplateBadge(title);

    return this.canvas.toDataURL('image/png');
  }

  private drawRealisticGradient(config: ThumbnailConfig): void {
    // Create a more sophisticated gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 400, 500);

    if (config.background.includes('linear-gradient')) {
      const colors = config.background.match(/#[a-fA-F0-9]{6}/g) || ['#374151', '#1e293b'];
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(0.5, this.lightenColor(colors[0], 20));
      gradient.addColorStop(1, colors[1] || colors[0]);
    } else {
      gradient.addColorStop(0, config.background);
      gradient.addColorStop(1, this.darkenColor(config.background, 30));
    }

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, 400, 500);

    // Add subtle texture
    this.ctx.globalAlpha = 0.1;
    this.ctx.fillStyle = config.accent;
    for (let i = 0; i < 20; i++) {
      this.ctx.beginPath();
      this.ctx.arc(
        Math.random() * 400,
        Math.random() * 500,
        Math.random() * 30 + 10,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1;
  }

  private drawRealisticPortrait(config: ThumbnailConfig, templateId: string): void {
    this.ctx.save();

    // Center the portrait
    const centerX = 200;
    const centerY = 200;

    // Draw head/face area
    this.ctx.fillStyle = '#D4A574'; // Realistic skin tone
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY - 20, 60, 0, Math.PI * 2);
    this.ctx.fill();

    // Add shadows for depth
    this.ctx.globalAlpha = 0.3;
    this.ctx.fillStyle = '#A0845C';
    this.ctx.beginPath();
    this.ctx.arc(centerX + 15, centerY - 10, 50, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.globalAlpha = 1;

    // Hair based on style
    this.drawHairStyle(centerX, centerY - 20, config);

    // Professional attire based on template
    this.drawAttire(centerX, centerY, templateId, config);

    // Simple facial features
    this.drawFacialFeatures(centerX, centerY - 20);

    this.ctx.restore();
  }

  private drawHairStyle(x: number, y: number, config: ThumbnailConfig): void {
    this.ctx.fillStyle = '#2D3748';
    this.ctx.beginPath();

    if (config.style === 'corporate' || config.style === 'academic') {
      // Professional short hair
      this.ctx.arc(x, y - 30, 50, 0, Math.PI);
    } else if (config.style === 'creative') {
      // More styled hair
      this.ctx.arc(x, y - 35, 55, 0, Math.PI);
    } else {
      // Default professional style
      this.ctx.arc(x, y - 30, 48, 0, Math.PI);
    }

    this.ctx.fill();
  }

  private drawAttire(x: number, y: number, templateId: string, config: ThumbnailConfig): void {
    // Shoulders and upper body
    this.ctx.fillStyle = this.getAttireColor(templateId);
    this.ctx.fillRect(x - 80, y + 40, 160, 200);

    // Add collar/lapels for business templates
    if (templateId.includes('executive') || templateId.includes('business') || templateId.includes('corporate')) {
      this.ctx.fillStyle = '#1A202C';
      // Suit jacket lapels
      this.ctx.beginPath();
      this.ctx.moveTo(x - 50, y + 40);
      this.ctx.lineTo(x - 20, y + 80);
      this.ctx.lineTo(x - 50, y + 120);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.moveTo(x + 50, y + 40);
      this.ctx.lineTo(x + 20, y + 80);
      this.ctx.lineTo(x + 50, y + 120);
      this.ctx.closePath();
      this.ctx.fill();
    }

    // Add shirt/collar
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(x - 30, y + 50, 60, 100);

    // Add tie for executive templates
    if (templateId.includes('executive') || templateId.includes('business')) {
      this.ctx.fillStyle = config.accent;
      this.ctx.fillRect(x - 8, y + 60, 16, 80);
    }
  }

  private getAttireColor(templateId: string): string {
    if (templateId.includes('executive') || templateId.includes('corporate')) {
      return '#1A202C'; // Dark suit
    } else if (templateId.includes('healthcare') || templateId.includes('clinical')) {
      return '#2D3748'; // Professional but softer
    } else if (templateId.includes('creative')) {
      return '#4C51BF'; // More colorful
    } else if (templateId.includes('academic')) {
      return '#2B6CB0'; // Academic blue
    } else if (templateId.includes('lifestyle') || templateId.includes('wellness')) {
      return '#065F46'; // Natural green
    } else {
      return '#374151'; // Default professional
    }
  }

  private drawFacialFeatures(x: number, y: number): void {
    // Eyes
    this.ctx.fillStyle = '#1A202C';
    this.ctx.beginPath();
    this.ctx.arc(x - 15, y - 5, 4, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(x + 15, y - 5, 4, 0, Math.PI * 2);
    this.ctx.fill();

    // Nose (subtle)
    this.ctx.globalAlpha = 0.3;
    this.ctx.fillStyle = '#A0845C';
    this.ctx.beginPath();
    this.ctx.arc(x, y + 5, 3, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.globalAlpha = 1;

    // Mouth
    this.ctx.strokeStyle = '#8B5A3C';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(x, y + 15, 8, 0, Math.PI);
    this.ctx.stroke();
  }

  private drawProfessionalStyling(config: ThumbnailConfig, templateId: string): void {
    // Add professional elements around the portrait
    this.ctx.globalAlpha = 0.2;
    this.ctx.fillStyle = config.accent;

    // Add subtle professional symbols
    if (templateId.includes('healthcare')) {
      // Stethoscope symbol
      this.ctx.beginPath();
      this.ctx.arc(50, 100, 20, 0, Math.PI);
      this.ctx.stroke();
    } else if (templateId.includes('creative')) {
      // Creative elements
      this.ctx.beginPath();
      this.ctx.arc(350, 120, 15, 0, Math.PI * 2);
      this.ctx.fill();
    } else if (templateId.includes('academic')) {
      // Book/education symbol
      this.ctx.fillRect(320, 80, 30, 20);
    }

    this.ctx.globalAlpha = 1;
  }

  private drawTemplateBadge(title: string): void {
    // Dark overlay at bottom
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(0, 420, 400, 80);

    // Title
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = 'bold 18px "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(title, 200, 450);

    // Subtitle
    this.ctx.font = '12px "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif';
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.fillText('Preview Estilo', 200, 470);
  }

  // Utility functions
  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const B = (num >> 8 & 0x00FF) + amt;
    const G = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
  }

  private darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const B = (num >> 8 & 0x00FF) - amt;
    const G = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 + (B > 255 ? 255 : B < 0 ? 0 : B) * 0x100 + (G > 255 ? 255 : G < 0 ? 0 : G)).toString(16).slice(1);
  }

  private getTemplateConfig(templateId: string, title: string): ThumbnailConfig {
    const templateSpecific = templateConfigs[templateId];
    if (templateSpecific) {
      const base = categoryConfigs[templateSpecific.category];
      return {
        ...base,
        ...templateSpecific
      };
    }

    // Fallback to default corporate style
    return categoryConfigs.corporate;
  }

  private drawBackground(config: ThumbnailConfig): void {
    // Create gradient
    const gradient = this.ctx.createLinearGradient(0, 0, 400, 500);

    if (config.background.includes('linear-gradient')) {
      // Parse gradient colors (simplified)
      const colors = config.background.match(/#[a-fA-F0-9]{6}/g) || ['#374151', '#1e293b'];
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1] || colors[0]);
    } else {
      gradient.addColorStop(0, config.background);
      gradient.addColorStop(1, config.background);
    }

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, 400, 500);
  }

  private drawGeometricElements(config: ThumbnailConfig): void {
    this.ctx.globalAlpha = 0.1;
    this.ctx.fillStyle = config.accent;

    // Add subtle geometric shapes based on template style
    switch (config.style) {
      case 'corporate':
        this.drawRectangles();
        break;
      case 'healthcare':
        this.drawCircles();
        break;
      case 'creative':
        this.drawTriangles();
        break;
      case 'academic':
        this.drawSquares();
        break;
      case 'lifestyle':
        this.drawOvals();
        break;
      case 'studio':
        this.drawLines();
        break;
    }

    this.ctx.globalAlpha = 1;
  }

  private drawRectangles(): void {
    for (let i = 0; i < 3; i++) {
      this.ctx.fillRect(50 + i * 100, 100 + i * 50, 80, 120);
    }
  }

  private drawCircles(): void {
    for (let i = 0; i < 4; i++) {
      this.ctx.beginPath();
      this.ctx.arc(100 + i * 60, 150 + i * 40, 30 + i * 10, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawTriangles(): void {
    for (let i = 0; i < 3; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(100 + i * 50, 100);
      this.ctx.lineTo(150 + i * 50, 200);
      this.ctx.lineTo(50 + i * 50, 200);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  private drawSquares(): void {
    for (let i = 0; i < 4; i++) {
      this.ctx.fillRect(60 + i * 70, 120 + i * 60, 60, 60);
    }
  }

  private drawOvals(): void {
    for (let i = 0; i < 3; i++) {
      this.ctx.beginPath();
      this.ctx.ellipse(150 + i * 40, 180 + i * 50, 40, 20, 0, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawLines(): void {
    this.ctx.lineWidth = 20;
    this.ctx.strokeStyle = this.ctx.fillStyle;
    for (let i = 0; i < 5; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, 50 + i * 80);
      this.ctx.lineTo(400, 100 + i * 80);
      this.ctx.stroke();
    }
  }

  private drawCategoryElements(config: ThumbnailConfig): void {
    this.ctx.globalAlpha = 0.3;
    this.ctx.fillStyle = config.accent;

    // Add category-specific icon representations
    switch (config.style) {
      case 'corporate':
        this.drawCorporateIcon();
        break;
      case 'healthcare':
        this.drawHealthcareIcon();
        break;
      case 'creative':
        this.drawCreativeIcon();
        break;
      case 'academic':
        this.drawAcademicIcon();
        break;
      case 'lifestyle':
        this.drawLifestyleIcon();
        break;
      case 'studio':
        this.drawStudioIcon();
        break;
    }

    this.ctx.globalAlpha = 1;
  }

  private drawCorporateIcon(): void {
    // Draw building silhouette
    this.ctx.fillRect(320, 150, 60, 200);
    this.ctx.fillRect(330, 140, 40, 10);
    // Windows
    this.ctx.globalAlpha = 0.1;
    this.ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 8; j++) {
        this.ctx.fillRect(325 + i * 12, 160 + j * 20, 8, 8);
      }
    }
  }

  private drawHealthcareIcon(): void {
    // Draw cross symbol
    this.ctx.fillRect(340, 200, 20, 60);
    this.ctx.fillRect(325, 215, 50, 20);
  }

  private drawCreativeIcon(): void {
    // Draw palette
    this.ctx.beginPath();
    this.ctx.arc(350, 220, 30, 0, Math.PI * 2);
    this.ctx.fill();
    // Hole in palette
    this.ctx.globalAlpha = 0;
    this.ctx.fillStyle = 'rgba(0,0,0,0)';
    this.ctx.beginPath();
    this.ctx.arc(360, 210, 8, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private drawAcademicIcon(): void {
    // Draw book
    this.ctx.fillRect(320, 200, 60, 40);
    this.ctx.fillRect(325, 190, 50, 10);
    // Pages
    this.ctx.globalAlpha = 0.2;
    this.ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 3; i++) {
      this.ctx.fillRect(325, 205 + i * 8, 50, 2);
    }
  }

  private drawLifestyleIcon(): void {
    // Draw leaf
    this.ctx.beginPath();
    this.ctx.ellipse(350, 220, 25, 15, Math.PI / 4, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private drawStudioIcon(): void {
    // Draw camera
    this.ctx.fillRect(320, 210, 60, 30);
    this.ctx.beginPath();
    this.ctx.arc(350, 225, 15, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private drawTextOverlay(title: string, config: ThumbnailConfig): void {
    this.ctx.fillStyle = config.textColor;
    this.ctx.textAlign = 'center';

    // Title
    this.ctx.font = 'bold 24px "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif';
    const words = title.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach((word) => {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = this.ctx.measureText(testLine);
      if (metrics.width > 300 && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    lines.push(currentLine);

    const startY = 400 - (lines.length - 1) * 15;
    lines.forEach((line, index) => {
      this.ctx.fillText(line, 200, startY + index * 30);
    });
  }

  private drawTemplateIndicator(config: ThumbnailConfig): void {
    // Add small indicator showing it's a template
    this.ctx.globalAlpha = 0.8;
    this.ctx.fillStyle = config.accent;
    this.ctx.fillRect(20, 20, 60, 20);

    this.ctx.fillStyle = config.background.includes('#ffffff') ? '#000000' : '#ffffff';
    this.ctx.font = '12px "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('TEMPLATE', 50, 35);

    this.ctx.globalAlpha = 1;
    this.ctx.textAlign = 'left'; // Reset alignment
  }
}

// Singleton instance
export const thumbnailGenerator = new ThumbnailGenerator();
