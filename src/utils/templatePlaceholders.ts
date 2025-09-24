// Generate placeholder images for templates until real photos are added

export const generateTemplatePlaceholder = (templateId: string, title: string): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';

  // Different gradients for each template type
  const gradients: Record<string, string[]> = {
    'psychologist-modern': ['#8b5cf6', '#3b82f6'],
    'therapist-cozy': ['#f59e0b', '#ec4899'], 
    'clinical': ['#06b6d4', '#8b5cf6'],
    'child-psychologist': ['#10b981', '#f59e0b'],
    'couples-therapist': ['#ec4899', '#8b5cf6'],
    'mindfulness': ['#059669', '#06b6d4'],
    'neuropsychologist': ['#3b82f6', '#6366f1'],
    'online-therapist': ['#8b5cf6', '#ec4899']
  };

  const colors = gradients[templateId] || ['#6366f1', '#8b5cf6'];
  
  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, 400, 400);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);
  
  // Fill background
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 400);
  
  // Add decorative shapes
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = '#ffffff';
  
  // Circles representing professional elements
  for (let i = 0; i < 4; i++) {
    const x = 100 + (i % 2) * 200;
    const y = 100 + Math.floor(i / 2) * 200;
    ctx.beginPath();
    ctx.arc(x, y, 30 + Math.random() * 20, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  // Add icon/symbol in center
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  
  // Different symbols for different templates
  const symbols: Record<string, string> = {
    'psychologist-modern': '👨‍💼',
    'therapist-cozy': '🏡',
    'clinical': '🏥', 
    'child-psychologist': '🧸',
    'couples-therapist': '💑',
    'mindfulness': '🧘',
    'neuropsychologist': '🧠',
    'online-therapist': '💻'
  };
  
  const symbol = symbols[templateId] || '👨‍⚕️';
  ctx.fillText(symbol, 200, 220);
  
  // Add title
  ctx.font = 'bold 16px Arial';
  ctx.fillText(title, 200, 280);
  
  // Add "TEMPLATE" label
  ctx.font = '12px Arial';
  ctx.globalAlpha = 0.6;
  ctx.fillText('TEMPLATE PREVIEW', 200, 350);
  
  return canvas.toDataURL('image/png');
};

// Cache generated placeholders
const placeholderCache = new Map<string, string>();

// Imagens CYBERPUNK VIBRANTES como o Artifex
const vibrантImages: Record<string, string> = {
  'psychologist-modern': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=600&fit=crop&sat=2&con=1.2', // Neon cyberpunk portrait
  'therapist-cozy': 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop&sat=2&con=1.2', // Purple neon vibes
  'clinical-psychologist': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&sat=2&con=1.2', // Blue tech aesthetic
  'child-psychologist': 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=400&h=600&fit=crop&sat=2&con=1.2', // Colorful tech vibes
  'couples-therapist': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&sat=2&con=1.2', // Pink/purple aesthetic
  'mindfulness-instructor': 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&h=600&fit=crop&sat=2&con=1.2', // Cyan/blue mystical
  'neuropsychologist': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&sat=2&con=1.2', // Tech/AI aesthetic
  'online-therapist': 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=600&fit=crop&sat=2&con=1.2', // Digital/virtual vibes
};

export const getTemplatePlaceholder = (templateId: string, title: string): string => {
  // Retorna imagem vibrante real se disponível, senão fallback para canvas
  return vibrантImages[templateId] || (() => {
    if (!placeholderCache.has(templateId)) {
      const placeholder = generateTemplatePlaceholder(templateId, title);
      placeholderCache.set(templateId, placeholder);
    }
    return placeholderCache.get(templateId)!;
  })();
};