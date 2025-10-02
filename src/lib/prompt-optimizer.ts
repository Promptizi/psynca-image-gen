// Sistema avançado de otimização de prompts para hiper-realismo e consistência
// Baseado nas melhores práticas da documentação Gemini API

export interface PromptSpecs {
  camera: string;
  lens: string;
  lighting: string;
  quality: string;
  postProcessing: string;
}

export interface PromptContext {
  profession: string;
  setting: string;
  mood: string;
  clothing: string;
  background: string;
  pose: string;
}

// Especificações técnicas profissionais para hiper-realismo
export const TECHNICAL_SPECS: Record<string, PromptSpecs> = {
  studio_portrait: {
    camera: "Canon EOS R5, professional studio setup",
    lens: "85mm f/1.4L lens at f/2.8 for optimal sharpness",
    lighting: "Three-point lighting setup with key light at 45°, soft fill light, subtle rim light",
    quality: "8K hyperrealistic photography, tack-sharp focus, professional depth of field",
    postProcessing: "Natural color grading, professional skin retouching, magazine-quality finish"
  },

  office_environment: {
    camera: "Canon EOS R5 with natural lighting adaptation",
    lens: "85mm f/1.4L lens at f/2.0 for environmental separation",
    lighting: "Soft window light from camera left, natural fill from environment",
    quality: "8K hyperrealistic photography, authentic office ambiance, natural bokeh",
    postProcessing: "Warm color grading, environmental realism, professional finish"
  },

  home_office: {
    camera: "Canon EOS R5 optimized for indoor natural light",
    lens: "85mm f/1.4L lens at f/1.8 for intimate environmental context",
    lighting: "Golden hour window light, warm ambient lighting from home environment",
    quality: "8K hyperrealistic photography, domestic authenticity, cozy professional feel",
    postProcessing: "Warm natural grading, home comfort enhancement, authentic lighting"
  },

  outdoor_natural: {
    camera: "Canon EOS R5 with outdoor light metering",
    lens: "85mm f/1.4L lens at f/2.8 for environmental depth",
    lighting: "Natural golden hour lighting, soft environmental fill, organic shadows",
    quality: "8K hyperrealistic photography, natural outdoor authenticity, environmental integration",
    postProcessing: "Natural outdoor color grading, environmental harmony, organic feel"
  },

  video_call: {
    camera: "Canon EOS R5 simulating high-quality webcam perspective",
    lens: "50mm equivalent perspective for natural video call framing",
    lighting: "Ring light with soft window fill, video-optimized illumination",
    quality: "8K hyperrealistic photography simulating high-end video call quality",
    postProcessing: "Digital-native color grading, screen-optimized processing, authentic video feel"
  },

  presentation: {
    camera: "Canon EOS R5 in presentation environment",
    lens: "85mm f/1.4L lens at f/2.5 for audience perspective",
    lighting: "Stage lighting with soft key light, ambient auditorium fill",
    quality: "8K hyperrealistic photography, professional presentation atmosphere",
    postProcessing: "Professional event color grading, authoritative presence enhancement"
  }
};

// Estrutura base para prompts hiper-realísticos
export class HyperRealisticPromptBuilder {
  private identityPreservation = "Transform this person into {role} while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context.";

  private qualityPrefix = "Hyperrealistic professional photography, ";
  private qualitySuffix = " Shot with {camera}, {lens}. {lighting}. {quality}. {postProcessing}";

  buildPrompt(context: PromptContext, specs: PromptSpecs, gender: 'male' | 'female' | 'unisex'): string {
    const genderPronoun = gender === 'male' ? 'this man' : gender === 'female' ? 'this woman' : 'this person';

    const parts = [
      // 1. Identity Preservation (Crítico)
      this.identityPreservation.replace('{role}', context.profession),

      // 2. Professional Context
      `${genderPronoun} as ${context.profession}.`,

      // 3. Physical Description & Pose
      `${context.pose}. ${context.clothing}.`,

      // 4. Expression & Mood
      `${context.mood}.`,

      // 5. Environment & Setting
      `${context.setting}. ${context.background}.`,

      // 6. Technical Specifications
      this.qualitySuffix
        .replace('{camera}', specs.camera)
        .replace('{lens}', specs.lens)
        .replace('{lighting}', specs.lighting)
        .replace('{quality}', specs.quality)
        .replace('{postProcessing}', specs.postProcessing)
    ];

    return this.qualityPrefix + parts.join(' ');
  }

  // Validador de qualidade do prompt
  validatePrompt(prompt: string): { score: number; issues: string[] } {
    const issues: string[] = [];
    let score = 100;

    // Verifica preservação de identidade
    if (!prompt.includes('maintaining') && !prompt.includes('preserve')) {
      issues.push('Missing identity preservation instruction');
      score -= 25;
    }

    // Verifica especificações técnicas
    if (!prompt.includes('Canon') && !prompt.includes('85mm')) {
      issues.push('Missing technical camera specifications');
      score -= 15;
    }

    // Verifica qualidade hiper-realística
    if (!prompt.includes('hyperrealistic') && !prompt.includes('8K')) {
      issues.push('Missing hyperrealistic quality specifications');
      score -= 15;
    }

    // Verifica iluminação
    if (!prompt.includes('lighting') && !prompt.includes('light')) {
      issues.push('Missing lighting specifications');
      score -= 10;
    }

    // Verifica contexto profissional
    if (!prompt.includes('professional') && !prompt.includes('psychologist')) {
      issues.push('Missing professional context');
      score -= 10;
    }

    // Verifica especificações de lente
    if (!prompt.includes('f/') && !prompt.includes('aperture')) {
      issues.push('Missing lens aperture specifications');
      score -= 10;
    }

    // Verifica pós-processamento
    if (!prompt.includes('grading') && !prompt.includes('retouching')) {
      issues.push('Missing post-processing specifications');
      score -= 15;
    }

    return { score: Math.max(0, score), issues };
  }

  // Gerador de variações para testes A/B
  generateVariations(baseContext: PromptContext, specs: PromptSpecs, gender: 'male' | 'female' | 'unisex'): string[] {
    const variations: string[] = [];

    // Variação 1: Base
    variations.push(this.buildPrompt(baseContext, specs, gender));

    // Variação 2: Ênfase na preservação de identidade
    const enhancedContext = {
      ...baseContext,
      mood: `Keep exact same facial features, eye color, and facial structure. ${baseContext.mood}`
    };
    variations.push(this.buildPrompt(enhancedContext, specs, gender));

    // Variação 3: Especificações técnicas aprimoradas
    const enhancedSpecs = {
      ...specs,
      quality: `${specs.quality}, pixel-perfect facial accuracy`,
      postProcessing: `${specs.postProcessing}, identity-preserving enhancement`
    };
    variations.push(this.buildPrompt(baseContext, enhancedSpecs, gender));

    return variations;
  }
}

// Helper functions para diferentes contextos profissionais
export const createPsychologistContext = (
  specialization: string,
  setting: 'office' | 'home' | 'studio' | 'outdoor' | 'video',
  style: 'formal' | 'casual' | 'creative',
  gender: 'male' | 'female' | 'unisex'
): PromptContext => {
  const baseContext: PromptContext = {
    profession: `professional psychologist specializing in ${specialization}`,
    setting: '',
    mood: '',
    clothing: '',
    background: '',
    pose: ''
  };

  // Configuração por ambiente
  switch (setting) {
    case 'studio':
      baseContext.setting = "Professional photography studio environment";
      baseContext.background = "Clean neutral background in warm beige tones, soft bokeh";
      baseContext.pose = "Confident professional posture facing camera directly";
      break;

    case 'office':
      baseContext.setting = "Modern therapeutic office environment";
      baseContext.background = "Therapy office with comfortable seating, plants, warm professional atmosphere";
      baseContext.pose = "Seated in professional consultation pose, welcoming body language";
      break;

    case 'home':
      baseContext.setting = "Well-organized home office environment";
      baseContext.background = "Home office with organized desk, plants, warm domestic professional setting";
      baseContext.pose = "Relaxed professional posture in home environment";
      break;

    case 'video':
      baseContext.setting = "Video call setup optimized for teletherapy";
      baseContext.background = "Professional video call background, clean and organized";
      baseContext.pose = "Positioned for video call, looking directly at camera with engaging presence";
      break;

    case 'outdoor':
      baseContext.setting = "Natural outdoor environment for alternative therapy";
      baseContext.background = "Natural outdoor setting with soft natural light, organic background";
      baseContext.pose = "Natural relaxed posture in outdoor therapeutic setting";
      break;
  }

  // Configuração por estilo
  switch (style) {
    case 'formal':
      baseContext.clothing = gender === 'male'
        ? "Dark navy blazer over crisp white shirt, professional tie optional"
        : "Professional blazer in neutral tones over elegant blouse, sophisticated professional styling";
      baseContext.mood = "Confident professional expression, warm empathetic smile, authoritative yet approachable";
      break;

    case 'casual':
      baseContext.clothing = gender === 'male'
        ? "Business casual shirt or quality sweater, professional but approachable"
        : "Professional casual blouse or elegant sweater, accessible professional styling";
      baseContext.mood = "Warm genuine smile, approachable empathetic expression, naturally confident";
      break;

    case 'creative':
      baseContext.clothing = "Creative professional attire that reflects innovative approach while maintaining professionalism";
      baseContext.mood = "Inspiring confident expression, creative energy, innovative professional presence";
      break;
  }

  return baseContext;
};

// Sistema de métricas para avaliar consistência
export interface ConsistencyMetrics {
  identityPreservationScore: number;
  technicalQualityScore: number;
  professionalContextScore: number;
  overallConsistencyScore: number;
  recommendations: string[];
}

export const evaluatePromptConsistency = (prompt: string): ConsistencyMetrics => {
  const builder = new HyperRealisticPromptBuilder();
  const validation = builder.validatePrompt(prompt);

  return {
    identityPreservationScore: prompt.includes('maintaining') ? 95 : 60,
    technicalQualityScore: (validation.score / 100) * 95,
    professionalContextScore: prompt.includes('psychologist') ? 90 : 70,
    overallConsistencyScore: validation.score,
    recommendations: validation.issues.map(issue => `Improve: ${issue}`)
  };
};

export default HyperRealisticPromptBuilder;