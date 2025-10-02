// Sistema completo de templates para profissionais de saúde mental
// Prompts otimizados com base na documentação Gemini API para hiper-realismo e consistência
// Utiliza técnicas avançadas de preservação de identidade facial e especificações técnicas profissionais
// 36 templates organizados em 6 categorias com sistema de filtros

export interface Template {
  id: string;
  title: string;
  image: string;
  prompt: string;
  category?: string;
  tags?: string[];
  gender: 'male' | 'female' | 'unisex';
  style: 'formal' | 'business-casual' | 'creative' | 'clinical';
  scenario: 'studio' | 'office' | 'home' | 'outdoor';
  description?: string;
}

export interface TemplateCategory {
  title: string;
  description: string;
  templates: Template[];
  color?: string;
  icon?: string;
}

// Cache para thumbnails geradas para evitar regerar constantemente
const thumbnailCache = new Map<string, string>();

// Função para limpar cache (útil durante desenvolvimento)
export const clearThumbnailCache = (): void => {
  thumbnailCache.clear();
  console.log('🗑️ Cache de thumbnails limpo');
};

// Thumbnails geradas com IA usando a imagem de referência
// Substituindo as imagens de referência por thumbnails reais geradas
const mentalHealthReferenceMapping: Record<string, string> = {
  // Retratos Profissionais - Thumbnails geradas
  'professional-headshot-male-formal': '/generated-thumbnails/professional-headshot-male-formal.jpg',
  'professional-headshot-female-formal': '/generated-thumbnails/professional-headshot-female-formal.jpg',
  'linkedin-portrait-male-casual': '/generated-thumbnails/linkedin-portrait-male-casual.jpg',
  'linkedin-portrait-female-casual': '/generated-thumbnails/linkedin-portrait-female-casual.jpg',
  'executive-portrait-female': '/generated-thumbnails/executive-portrait-female.jpg',
  'friendly-headshot-male': '/generated-thumbnails/friendly-headshot-male.jpg',

  // Consultório & Terapia - Thumbnails geradas
  'therapy-session-female': '/generated-thumbnails/therapy-session-female.jpg',
  'consultation-room-female': '/generated-thumbnails/consultation-room-female.jpg',
  'group-therapy-facilitator': '/generated-thumbnails/group-therapy-facilitator.jpg',
  'clinical-assessment': '/generated-thumbnails/clinical-assessment.jpg',
  'therapeutic-conversation': '/generated-thumbnails/therapeutic-conversation.jpg',
  'family-therapy-setting': '/generated-thumbnails/family-therapy-setting.jpg',

  // Home Office & Teleconsulta - Thumbnails geradas
  'home-office-consultation': '/generated-thumbnails/home-office-consultation.jpg',
  'video-therapy-session': '/generated-thumbnails/video-therapy-session.jpg',
  'online-counseling-male': '/generated-thumbnails/online-counseling-male.jpg',
  'teletherapy-setup': '/generated-thumbnails/teletherapy-setup.jpg',
  'remote-consultation': '/generated-thumbnails/remote-consultation.jpg',
  'digital-therapy-female': '/generated-thumbnails/digital-therapy-female.jpg',

  // Workshops & Palestras - Thumbnails geradas
  'workshop-presenter-female': '/generated-thumbnails/workshop-presenter-female.jpg',
  'seminar-speaker-male': '/generated-thumbnails/seminar-speaker-male.jpg',
  'training-facilitator': '/generated-thumbnails/training-facilitator.jpg',
  'conference-presenter': '/generated-thumbnails/conference-presenter.jpg',
  'workshop-interaction': '/generated-thumbnails/workshop-interaction.jpg',
  'educational-speaker': '/generated-thumbnails/educational-speaker.jpg',

  // Lifestyle Profissional - Thumbnails geradas
  'coffee-consultation': '/generated-thumbnails/coffee-consultation.jpg',
  'outdoor-therapy-walk': '/generated-thumbnails/outdoor-therapy-walk.jpg',
  'coworking-space': '/generated-thumbnails/coworking-space.jpg',
  'wellness-lifestyle': '/generated-thumbnails/wellness-lifestyle.jpg',
  'professional-networking': '/generated-thumbnails/professional-networking.jpg',
  'mindful-break': '/generated-thumbnails/mindful-break.jpg',

  // Estúdio Criativo - Thumbnails geradas
  'studio-portrait-dramatic': '/generated-thumbnails/studio-portrait-dramatic.jpg',
  'creative-headshot': '/generated-thumbnails/artistic-portrait.jpg', // Usando artistic como alternativa
  'artistic-portrait': '/generated-thumbnails/artistic-portrait.jpg',
  'minimalist-studio': '/generated-thumbnails/minimalist-studio.jpg',
  'professional-branding': '/generated-thumbnails/professional-branding.jpg',
  'dynamic-portrait': '/generated-thumbnails/dynamic-portrait.jpg'
};

// Fallback para imagens de referência originais (para templates não mapeados)
const referenceImageMapping: Record<string, string> = {
  // Fallback genérico
  'fallback': '/Referencia_img_prompt/fcbf9043fba4c1d155c79ddcbbcc2f2d.jpg'
};

// Helper function para obter thumbnail - usa mapeamento específico para saúde mental
export const getTemplateThumbnail = (templateId: string, templateTitle: string): string => {
  // Check cache first
  if (thumbnailCache.has(templateId)) {
    return thumbnailCache.get(templateId)!;
  }

  // 1. Prioridade: Mapeamento específico para profissionais de saúde mental
  const mentalHealthImage = mentalHealthReferenceMapping[templateId];
  if (mentalHealthImage) {
    thumbnailCache.set(templateId, mentalHealthImage);
    return mentalHealthImage;
  }

  // 2. Fallback: Imagens de referência originais
  const referenceImage = referenceImageMapping[templateId];
  if (referenceImage) {
    thumbnailCache.set(templateId, referenceImage);
    return referenceImage;
  }

  // 3. Fallback final: Imagem de referência genérica
  const fallbackImage = '/Referencia_img_prompt/fcbf9043fba4c1d155c79ddcbbcc2f2d.jpg';
  thumbnailCache.set(templateId, fallbackImage);
  return fallbackImage;
};

// Sistema completo de filtros para templates
export type TemplateFilters = {
  gender?: 'male' | 'female' | 'unisex';
  style?: 'formal' | 'business-casual' | 'creative' | 'clinical';
  scenario?: 'studio' | 'office' | 'home' | 'outdoor';
};

// Helper function para filtrar templates
export const filterTemplates = (filters: TemplateFilters): Template[] => {
  return templateCategories.flatMap(category =>
    category.templates.filter(template => {
      if (filters.gender && template.gender !== filters.gender && template.gender !== 'unisex') {
        return false;
      }
      if (filters.style && template.style !== filters.style) {
        return false;
      }
      if (filters.scenario && template.scenario !== filters.scenario) {
        return false;
      }
      return true;
    })
  );
};

export const templateCategories: TemplateCategory[] = [
  {
    title: "Retratos Profissionais",
    description: "Headshots e retratos para LinkedIn, sites e materiais promocionais",
    color: "#4F46E5",
    icon: "User",
    templates: [
      {
        id: "professional-headshot-male-formal",
        title: "Retrato Masculino Formal",
        image: getTemplateThumbnail("professional-headshot-male-formal", "Retrato Masculino Formal"),
        gender: "male",
        style: "formal",
        scenario: "studio",
        description: "Headshot profissional masculino em ambiente corporativo",
        prompt: "Hyperrealistic professional photography, transform this man into professional psychologist specializing in clinical therapy while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this man as professional psychologist specializing in clinical therapy. Confident professional posture facing camera directly. Dark navy blazer over crisp white shirt, professional tie optional. Confident professional expression, warm empathetic smile, authoritative yet approachable. Professional photography studio environment. Clean neutral background in warm beige tones, soft bokeh. Shot with Canon EOS R5, professional studio setup, 85mm f/1.4L lens at f/2.8 for optimal sharpness. Three-point lighting setup with key light at 45°, soft fill light, subtle rim light. 8K hyperrealistic photography, tack-sharp focus, professional depth of field. Natural color grading, professional skin retouching, magazine-quality finish."
      },
      {
        id: "professional-headshot-female-formal",
        title: "Retrato Feminino Formal",
        image: getTemplateThumbnail("professional-headshot-female-formal", "Retrato Feminino Formal"),
        gender: "female",
        style: "formal",
        scenario: "studio",
        description: "Headshot profissional feminino elegante e confiante",
        prompt: "Hyperrealistic professional photography, transform this woman into professional psychologist specializing in family therapy while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this woman as professional psychologist specializing in family therapy. Confident professional posture facing camera directly. Professional blazer in neutral tones over elegant blouse, sophisticated professional styling. Confident professional expression, warm empathetic smile, authoritative yet approachable. Professional photography studio environment. Clean neutral background in warm beige tones, soft bokeh. Shot with Canon EOS R5, professional studio setup, 85mm f/1.4L lens at f/2.8 for optimal sharpness. Three-point lighting setup with key light at 45°, soft fill light, subtle rim light. 8K hyperrealistic photography, tack-sharp focus, professional depth of field. Natural color grading, professional skin retouching, magazine-quality finish."
      },
      {
        id: "linkedin-portrait-male-casual",
        title: "LinkedIn Masculino Casual",
        image: getTemplateThumbnail("linkedin-portrait-male-casual", "LinkedIn Masculino Casual"),
        gender: "male",
        style: "business-casual",
        scenario: "office",
        description: "Retrato descontraído mas profissional para redes sociais",
        prompt: "Hyperrealistic professional photography, transform this man into professional psychologist specializing in relationship counseling while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this man as professional psychologist specializing in relationship counseling. Seated in professional consultation pose, welcoming body language. Business casual shirt or quality sweater, professional but approachable. Warm genuine smile, approachable empathetic expression, naturally confident. Modern therapeutic office environment. Therapy office with comfortable seating, plants, warm professional atmosphere. Shot with Canon EOS R5 with natural lighting adaptation, 85mm f/1.4L lens at f/2.0 for environmental separation. Soft window light from camera left, natural fill from environment. 8K hyperrealistic photography, authentic office ambiance, natural bokeh. Warm color grading, environmental realism, professional finish."
      },
      {
        id: "linkedin-portrait-female-casual",
        title: "LinkedIn Feminino Casual",
        image: getTemplateThumbnail("linkedin-portrait-female-casual", "LinkedIn Feminino Casual"),
        gender: "female",
        style: "business-casual",
        scenario: "office",
        description: "Retrato feminino acessível com óculos e sorriso caloroso",
        prompt: "Hyperrealistic professional photography, transform this woman into professional psychologist specializing in child and adolescent therapy while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this woman as professional psychologist specializing in child and adolescent therapy. Seated in professional consultation pose, welcoming body language. Professional casual blouse or elegant sweater, accessible professional styling, elegant glasses, discrete necklace. Warm genuine smile, approachable empathetic expression, naturally confident. Modern therapeutic office environment. Therapy office with comfortable seating, plants, warm professional atmosphere. Shot with Canon EOS R5 with natural lighting adaptation, 85mm f/1.4L lens at f/2.0 for environmental separation. Soft window light from camera left, natural fill from environment. 8K hyperrealistic photography, authentic office ambiance, natural bokeh. Warm color grading, environmental realism, professional finish."
      },
      {
        id: "executive-portrait-female",
        title: "Retrato Executivo Feminino",
        image: getTemplateThumbnail("executive-portrait-female", "Retrato Executivo Feminino"),
        gender: "female",
        style: "formal",
        scenario: "studio",
        description: "Retrato formal com iluminação dramática e elegante",
        prompt: "Hyperrealistic professional photography, transform this woman into senior clinical psychologist and supervisor while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this woman as senior clinical psychologist and supervisor. Confident professional posture facing camera directly. Professional blazer in neutral tones over elegant blouse, sophisticated professional styling, executive presence. Confident professional expression, warm empathetic smile, authoritative yet approachable, serious but empathetic demeanor. Professional photography studio environment. Clean neutral background in warm beige tones, soft bokeh with dramatic lighting accents. Shot with Canon EOS R5, professional studio setup, 85mm f/1.4L lens at f/2.8 for optimal sharpness. Three-point lighting setup with key light at 45°, soft fill light, subtle rim light, dramatic side lighting. 8K hyperrealistic photography, tack-sharp focus, professional depth of field. Natural color grading, professional skin retouching, magazine-quality finish."
      },
      {
        id: "friendly-headshot-male",
        title: "Retrato Masculino Acolhedor",
        image: getTemplateThumbnail("friendly-headshot-male", "Retrato Masculino Acolhedor"),
        gender: "male",
        style: "business-casual",
        scenario: "office",
        description: "Retrato caloroso com luz natural e expressão acolhedora",
        prompt: "Hyperrealistic professional photography, transform this man into professional psychologist specializing in couples and relationship therapy while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this man as professional psychologist specializing in couples and relationship therapy. Relaxed professional posture in home environment. Business casual shirt or quality sweater, professional but approachable. Warm genuine smile, approachable empathetic expression, naturally confident. Well-organized home office environment. Home office with organized desk, plants, warm domestic professional setting. Shot with Canon EOS R5 optimized for indoor natural light, 85mm f/1.4L lens at f/1.8 for intimate environmental context. Golden hour window light, warm ambient lighting from home environment. 8K hyperrealistic photography, domestic authenticity, cozy professional feel. Warm natural grading, home comfort enhancement, authentic lighting."
      }
    ]
  },
  {
    title: "Consultório & Terapia",
    description: "Ambientes terapêuticos hiper-realísticos para sessões e consultas com consistência facial",
    color: "#10B981",
    icon: "Heart",
    templates: [
      {
        id: "therapy-session-female",
        title: "Sessão Terapêutica Feminina",
        image: getTemplateThumbnail("therapy-session-female", "Sessão Terapêutica Feminina"),
        gender: "female",
        style: "clinical",
        scenario: "office",
        description: "Terapeuta em videochamada com expressão acolhedora",
        prompt: "Hyperrealistic professional photography, transform this woman into professional psychologist specializing in online therapy sessions while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this woman as professional psychologist specializing in online therapy sessions. Positioned for video call, looking directly at camera with engaging presence. Professional blazer in neutral tones over elegant blouse, sophisticated professional styling. Confident professional expression, warm empathetic smile, authoritative yet approachable. Video call setup optimized for teletherapy. Professional video call background, clean and organized. Shot with Canon EOS R5 simulating high-quality webcam perspective, 50mm equivalent perspective for natural video call framing. Ring light with soft window fill, video-optimized illumination. 8K hyperrealistic photography simulating high-end video call quality. Digital-native color grading, screen-optimized processing, authentic video feel."
      },
      {
        id: "consultation-room-female",
        title: "Consultório Acolhedor",
        image: getTemplateThumbnail("consultation-room-female", "Consultório Acolhedor"),
        gender: "female",
        style: "clinical",
        scenario: "office",
        description: "Psicóloga lendo em ambiente com plantas e atmosfera calma",
        prompt: "Hyperrealistic professional photography, transform this woman into professional psychologist in contemplative study moment while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this woman as professional psychologist in contemplative study moment. Relaxed professional posture in home environment, reading psychology journal or book. Professional casual blouse or elegant sweater, accessible professional styling. Warm genuine smile, approachable empathetic expression, naturally confident, serene and focused expression. Well-organized home office environment. Home office with organized desk, plants, warm domestic professional setting, abundant plants, candles, cozy therapeutic atmosphere. Shot with Canon EOS R5 optimized for indoor natural light, 85mm f/1.4L lens at f/1.8 for intimate environmental context. Golden hour window light, warm ambient lighting from home environment. 8K hyperrealistic photography, domestic authenticity, cozy professional feel. Warm natural grading, home comfort enhancement, authentic lighting."
      },
      {
        id: "group-therapy-facilitator",
        title: "Facilitador Terapia de Grupo",
        image: getTemplateThumbnail("group-therapy-facilitator", "Facilitador Terapia de Grupo"),
        gender: "unisex",
        style: "clinical",
        scenario: "office",
        description: "Profissional em ambiente preparado para sessões em grupo",
        prompt: "Hyperrealistic professional photography, transform this person into professional group therapy facilitator while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as professional group therapy facilitator. Seated in professional consultation pose, welcoming body language. Creative professional attire that reflects innovative approach while maintaining professionalism. Inspiring confident expression, creative energy, innovative professional presence. Modern therapeutic office environment. Therapy office with comfortable seating, plants, warm professional atmosphere, chairs arranged in circle, elements promoting unity and emotional safety. Shot with Canon EOS R5 with natural lighting adaptation, 85mm f/1.4L lens at f/2.0 for environmental separation. Soft window light from camera left, natural fill from environment. 8K hyperrealistic photography, authentic office ambiance, natural bokeh. Warm color grading, environmental realism, professional finish."
      },
      {
        id: "clinical-assessment",
        title: "Avaliação Clínica",
        image: getTemplateThumbnail("clinical-assessment", "Avaliação Clínica"),
        gender: "unisex",
        style: "clinical",
        scenario: "office",
        description: "Psicólogo em ambiente clínico organizado",
        prompt: "Hyperrealistic professional photography, transform this person into clinical psychologist conducting psychological assessment while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as clinical psychologist conducting psychological assessment. Seated in professional consultation pose, welcoming body language. Professional clinical attire or lab coat, organized assessment materials. Confident professional expression, warm empathetic smile, authoritative yet approachable, competent and reliable demeanor. Modern therapeutic office environment. Clean professional office with diplomas, certifications, structured work desk, psychological assessment materials organized. Shot with Canon EOS R5 with natural lighting adaptation, 85mm f/1.4L lens at f/2.0 for environmental separation. Soft window light from camera left, natural fill from environment. 8K hyperrealistic photography, authentic office ambiance, natural bokeh. Warm color grading, environmental realism, professional finish."
      },
      {
        id: "therapeutic-conversation",
        title: "Conversa Terapêutica",
        image: getTemplateThumbnail("therapeutic-conversation", "Conversa Terapêutica"),
        gender: "unisex",
        style: "clinical",
        scenario: "office",
        description: "Momento de diálogo empático com paciente",
        prompt: "Hyperrealistic professional photography, transform this person into therapist during empathetic therapeutic conversation while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as therapist during empathetic therapeutic conversation. Seated in professional consultation pose, welcoming body language, active listening posture, hands in receptive position. Business casual shirt or quality sweater, professional but approachable. Warm genuine smile, approachable empathetic expression, naturally confident, present and empathetic. Modern therapeutic office environment. Therapy office with comfortable seating, plants, warm professional atmosphere, comfortable armchairs, psychological safety elements. Shot with Canon EOS R5 with natural lighting adaptation, 85mm f/1.4L lens at f/2.0 for environmental separation. Soft window light from camera left, natural fill from environment. 8K hyperrealistic photography, authentic office ambiance, natural bokeh. Warm color grading, environmental realism, professional finish."
      },
      {
        id: "family-therapy-setting",
        title: "Terapia Familiar",
        image: getTemplateThumbnail("family-therapy-setting", "Terapia Familiar"),
        gender: "unisex",
        style: "clinical",
        scenario: "home",
        description: "Especialista em terapia familiar em ambiente acolhedor",
        prompt: "Hyperrealistic professional photography, transform this person into family therapy specialist while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as family therapy specialist. Relaxed professional posture in home environment. Professional but warm attire, maternal/paternal expression. Warm genuine smile, approachable empathetic expression, naturally confident, family-trusting demeanor. Well-organized home office environment. Home office with organized desk, plants, warm domestic professional setting, family-decorated space with natural elements, soft colors, spacious and comfortable. Shot with Canon EOS R5 optimized for indoor natural light, 85mm f/1.4L lens at f/1.8 for intimate environmental context. Golden hour window light, warm ambient lighting from home environment. 8K hyperrealistic photography, domestic authenticity, cozy professional feel. Warm natural grading, home comfort enhancement, authentic lighting."
      }
    ]
  },
  {
    title: "Home Office & Teleconsulta",
    description: "Profissionais hiper-realísticos em atendimento online com preservação de identidade",
    color: "#8B5CF6",
    icon: "Monitor",
    templates: [
      {
        id: "home-office-consultation",
        title: "Consulta Home Office",
        image: getTemplateThumbnail("home-office-consultation", "Consulta Home Office"),
        gender: "female",
        style: "business-casual",
        scenario: "home",
        description: "Múltiplas poses de terapeuta em home office bem organizado",
        prompt: "Hyperrealistic professional photography, transform this woman into professional therapist in organized home office while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this woman as professional therapist in organized home office. Relaxed professional posture in home environment, multiple poses: working on laptop, taking coffee, making notes. Professional blazer in neutral tones over elegant blouse, sophisticated professional styling. Warm genuine smile, approachable empathetic expression, naturally confident. Well-organized home office environment. Home office with organized desk, plants, warm domestic professional setting, wooden desk, plants, orange mug, organized work materials. Shot with Canon EOS R5 optimized for indoor natural light, 85mm f/1.4L lens at f/1.8 for intimate environmental context. Golden hour window light, warm ambient lighting from home environment. 8K hyperrealistic photography, domestic authenticity, cozy professional feel. Warm natural grading, home comfort enhancement, authentic lighting."
      },
      {
        id: "video-therapy-session",
        title: "Sessão por Vídeo",
        image: getTemplateThumbnail("video-therapy-session", "Sessão por Vídeo"),
        gender: "unisex",
        style: "business-casual",
        scenario: "home",
        description: "Terapeuta em videochamada com setup profissional",
        prompt: "Hyperrealistic professional photography, transform this person into therapist in professional video call session while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as therapist in professional video call session. Positioned for video call, looking directly at camera with engaging presence, welcoming gesticulation. Professional casual blouse or elegant sweater, accessible professional styling. Warm genuine smile, approachable empathetic expression, naturally confident. Video call setup optimized for teletherapy. Professional video call background, clean and organized, professional domestic environment. Shot with Canon EOS R5 simulating high-quality webcam perspective, 50mm equivalent perspective for natural video call framing. Ring light with soft window fill, video-optimized illumination. 8K hyperrealistic photography simulating high-end video call quality. Digital-native color grading, screen-optimized processing, authentic video feel."
      },
      {
        id: "online-counseling-male",
        title: "Aconselhamento Online Masculino",
        image: getTemplateThumbnail("online-counseling-male", "Aconselhamento Online Masculino"),
        gender: "male",
        style: "business-casual",
        scenario: "home",
        description: "Psicólogo masculino em ambiente moderno de teleconsulta",
        prompt: "Hyperrealistic professional photography, transform this man into psychologist specialized in online consultations while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this man as psychologist specialized in online consultations. Positioned for video call, looking directly at camera with engaging presence. Business casual shirt or quality sweater, professional but approachable. Warm genuine smile, approachable empathetic expression, naturally confident, confident but accessible. Well-organized home office environment. Home office with organized desk, plants, warm domestic professional setting, modern tech elements, video-adequate setup. Shot with Canon EOS R5 simulating high-quality webcam perspective, 50mm equivalent perspective for natural video call framing. Ring light with soft window fill, video-optimized illumination. 8K hyperrealistic photography simulating high-end video call quality. Digital-native color grading, screen-optimized processing, authentic video feel."
      },
      {
        id: "teletherapy-setup",
        title: "Setup Teleterapia",
        image: getTemplateThumbnail("teletherapy-setup", "Setup Teleterapia"),
        gender: "unisex",
        style: "creative",
        scenario: "home",
        description: "Configuração profissional para atendimento remoto",
        prompt: "Hyperrealistic professional photography, transform this person into therapist with optimized teletherapy setup while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as therapist with optimized teletherapy setup. Positioned for video call, looking directly at camera with engaging presence, posture adapted for digital consultation. Creative professional attire that reflects innovative approach while maintaining professionalism, video-appropriate colors. Inspiring confident expression, creative energy, innovative professional presence. Video call setup optimized for teletherapy. Professional video call background, clean and organized, creative but professional environment, quality equipment, technical adequate lighting. Shot with Canon EOS R5 simulating high-quality webcam perspective, 50mm equivalent perspective for natural video call framing. Ring light with soft window fill, video-optimized illumination. 8K hyperrealistic photography simulating high-end video call quality. Digital-native color grading, screen-optimized processing, authentic video feel."
      },
      {
        id: "remote-consultation",
        title: "Consulta Remota",
        image: getTemplateThumbnail("remote-consultation", "Consulta Remota"),
        gender: "unisex",
        style: "business-casual",
        scenario: "home",
        description: "Sessão de consulta psicológica à distância",
        prompt: "Hyperrealistic professional photography, transform this person into specialist in organized remote consultations while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as specialist in organized remote consultations. Relaxed professional posture in home environment, structured work desk, organized materials. Professional casual blouse or elegant sweater, accessible professional styling. Warm genuine smile, approachable empathetic expression, naturally confident, focused and welcoming expression. Well-organized home office environment. Home office with organized desk, plants, warm domestic professional setting, optimized for consultation, professional domestic environment. Shot with Canon EOS R5 optimized for indoor natural light, 85mm f/1.4L lens at f/1.8 for intimate environmental context. Golden hour window light, warm ambient lighting from home environment. 8K hyperrealistic photography, domestic authenticity, cozy professional feel. Warm natural grading, home comfort enhancement, authentic lighting."
      },
      {
        id: "digital-therapy-female",
        title: "Terapia Digital Feminina",
        image: getTemplateThumbnail("digital-therapy-female", "Terapia Digital Feminina"),
        gender: "female",
        style: "creative",
        scenario: "home",
        description: "Terapeuta feminina especializada em ambiente digital",
        prompt: "Hyperrealistic professional photography, transform this woman into female therapist specialized in modern digital therapy while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this woman as female therapist specialized in modern digital therapy. Positioned for video call, looking directly at camera with engaging presence. Creative professional attire that reflects innovative approach while maintaining professionalism, digitally-appropriate clothing. Inspiring confident expression, creative energy, innovative professional presence, serene and present expression adapted for virtual connection. Video call setup optimized for teletherapy. Professional video call background, clean and organized, zen environment adapted for digital, elements transmitting calm through screen, mindful online setup. Shot with Canon EOS R5 simulating high-quality webcam perspective, 50mm equivalent perspective for natural video call framing. Ring light with soft window fill, video-optimized illumination. 8K hyperrealistic photography simulating high-end video call quality. Digital-native color grading, screen-optimized processing, authentic video feel."
      }
    ]
  },
  {
    title: "Workshops & Palestras",
    description: "Apresentações hiper-realísticas com consistência facial para profissionais",
    color: "#F59E0B",
    icon: "Presentation",
    templates: [
      {
        id: "workshop-presenter-female",
        title: "Palestrante Feminina",
        image: getTemplateThumbnail("workshop-presenter-female", "Palestrante Feminina"),
        gender: "female",
        style: "formal",
        scenario: "office",
        description: "Apresentadora profissional em ambiente de workshop",
        prompt: "Hyperrealistic professional photography, transform this woman into psychology specialist presenter while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this woman as psychology specialist presenter. Confident professional posture facing camera directly, gesticulating during presentation. Professional blazer in neutral tones over elegant blouse, sophisticated professional styling. Confident professional expression, warm empathetic smile, authoritative yet approachable, confident and didactic expression. Modern therapeutic office environment. Presentation environment with educational materials, experienced educator posture. Shot with Canon EOS R5 in presentation environment, 85mm f/1.4L lens at f/2.5 for audience perspective. Stage lighting with soft key light, ambient auditorium fill. 8K hyperrealistic photography, professional presentation atmosphere. Professional event color grading, authoritative presence enhancement."
      },
      {
        id: "seminar-speaker-male",
        title: "Palestrante Masculino",
        image: getTemplateThumbnail("seminar-speaker-male", "Palestrante Masculino"),
        gender: "male",
        style: "formal",
        scenario: "office",
        description: "Especialista masculino apresentando para audiência profissional",
        prompt: "Hyperrealistic professional photography, transform this man into male psychologist professional seminar speaker while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this man as male psychologist professional seminar speaker. Confident professional posture facing camera directly, experienced presenter posture, didactic and engaging gesticulation. Dark navy blazer over crisp white shirt, professional tie optional, elegant suit. Confident professional expression, warm empathetic smile, authoritative yet approachable, academic authority but accessible. Modern therapeutic office environment. Academic or conference environment, presentation materials in background. Shot with Canon EOS R5 in presentation environment, 85mm f/1.4L lens at f/2.5 for audience perspective. Stage lighting with soft key light, ambient auditorium fill. 8K hyperrealistic photography, professional presentation atmosphere. Professional event color grading, authoritative presence enhancement."
      },
      {
        id: "training-facilitator",
        title: "Facilitador de Treinamento",
        image: getTemplateThumbnail("training-facilitator", "Facilitador de Treinamento"),
        gender: "unisex",
        style: "business-casual",
        scenario: "office",
        description: "Instrutor conduzindo treinamento em habilidades terapêuticas",
        prompt: "Hyperrealistic professional photography, transform this person into therapeutic skills training facilitator while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as therapeutic skills training facilitator. Seated in professional consultation pose, welcoming body language, experienced educator posture. Business casual shirt or quality sweater, professional but approachable. Warm genuine smile, approachable empathetic expression, naturally confident, engaging and motivating expression. Modern therapeutic office environment. Training environment with didactic resources, group connection capacity. Shot with Canon EOS R5 with natural lighting adaptation, 85mm f/1.4L lens at f/2.0 for environmental separation. Soft window light from camera left, natural fill from environment. 8K hyperrealistic photography, authentic office ambiance, natural bokeh. Warm color grading, environmental realism, professional finish."
      },
      {
        id: "conference-presenter",
        title: "Apresentador de Conferência",
        image: getTemplateThumbnail("conference-presenter", "Apresentador de Conferência"),
        gender: "unisex",
        style: "formal",
        scenario: "office",
        description: "Especialista apresentando em conferência de saúde mental",
        prompt: "Hyperrealistic professional photography, transform this person into mental health conference specialist presenter while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as mental health conference specialist presenter. Confident professional posture facing camera directly, subject authority posture. Professional blazer in neutral tones over elegant blouse, sophisticated professional styling, formal presenter attire. Confident professional expression, warm empathetic smile, authoritative yet approachable, competent and inspiring expression. Modern therapeutic office environment. Professional conference environment, academic presentation materials in background. Shot with Canon EOS R5 in presentation environment, 85mm f/1.4L lens at f/2.5 for audience perspective. Stage lighting with soft key light, ambient auditorium fill. 8K hyperrealistic photography, professional presentation atmosphere. Professional event color grading, authoritative presence enhancement."
      },
      {
        id: "workshop-interaction",
        title: "Interação em Workshop",
        image: getTemplateThumbnail("workshop-interaction", "Interação em Workshop"),
        gender: "unisex",
        style: "business-casual",
        scenario: "office",
        description: "Momento de interação dinâmica com participantes",
        prompt: "Hyperrealistic professional photography, transform this person into dynamic workshop interaction facilitator while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as dynamic workshop interaction facilitator. Confident professional posture facing camera directly, group interaction movement, inclusive gesticulation. Business casual shirt or quality sweater, professional but approachable, movement-allowing attire. Warm genuine smile, approachable empathetic expression, naturally confident, enthusiastic and welcoming expression. Modern therapeutic office environment. Interactive workshop environment, group activity materials. Shot with Canon EOS R5 with natural lighting adaptation, 85mm f/1.4L lens at f/2.0 for environmental separation. Soft window light from camera left, natural fill from environment. 8K hyperrealistic photography, authentic office ambiance, natural bokeh. Warm color grading, environmental realism, professional finish."
      },
      {
        id: "educational-speaker",
        title: "Palestrante Educacional",
        image: getTemplateThumbnail("educational-speaker", "Palestrante Educacional"),
        gender: "unisex",
        style: "creative",
        scenario: "office",
        description: "Educador em psicologia para diferentes públicos",
        prompt: "Hyperrealistic professional photography, transform this person into psychology educator for diverse audiences while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as psychology educator for diverse audiences. Confident professional posture facing camera directly, adaptable educator posture. Creative professional attire that reflects innovative approach while maintaining professionalism, versatile attire for different contexts. Inspiring confident expression, creative energy, innovative professional presence, didactic and inspiring expression. Modern therapeutic office environment. Multiple-purpose educational environment, varied educational materials. Shot with Canon EOS R5 with natural lighting adaptation, 85mm f/1.4L lens at f/2.0 for environmental separation. Soft window light from camera left, natural fill from environment. 8K hyperrealistic photography, authentic office ambiance, natural bokeh. Warm color grading, environmental realism, professional finish."
      }
    ]
  },
  {
    title: "Lifestyle Profissional",
    description: "Profissionais hiper-realísticos equilibrando vida e carreira com consistência facial",
    color: "#EC4899",
    icon: "Coffee",
    templates: [
      {
        id: "coffee-consultation",
        title: "Consulta Informal",
        image: getTemplateThumbnail("coffee-consultation", "Consulta Informal"),
        gender: "unisex",
        style: "business-casual",
        scenario: "outdoor",
        description: "Encontro terapêutico em ambiente descontraído",
        prompt: "Hyperrealistic professional photography, transform this person into therapist in informal consultation setting while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as therapist in informal consultation setting. Natural relaxed posture in outdoor therapeutic setting. Business casual shirt or quality sweater, professional but approachable. Warm genuine smile, approachable empathetic expression, naturally confident, warm and accessible expression. Natural outdoor environment for alternative therapy. Coffee environment or welcoming space, accessible therapy approach. Shot with Canon EOS R5 with outdoor light metering, 85mm f/1.4L lens at f/2.8 for environmental depth. Natural golden hour lighting, soft environmental fill, organic shadows. 8K hyperrealistic photography, natural outdoor authenticity, environmental integration. Natural outdoor color grading, environmental harmony, organic feel."
      },
      {
        id: "outdoor-therapy-walk",
        title: "Terapia Caminhando",
        image: getTemplateThumbnail("outdoor-therapy-walk", "Terapia Caminhando"),
        gender: "unisex",
        style: "creative",
        scenario: "outdoor",
        description: "Sessão terapêutica ao ar livre em movimento",
        prompt: "Hyperrealistic professional photography, transform this person into outdoor therapy specialist in movement while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as outdoor therapy specialist in movement. Natural relaxed posture in outdoor therapeutic setting, dynamic walking therapy posture. Creative professional attire that reflects innovative approach while maintaining professionalism, appropriate for external activity. Inspiring confident expression, creative energy, innovative professional presence, present and connected with nature. Natural outdoor environment for alternative therapy. Natural outdoor setting with soft natural light, organic background. Shot with Canon EOS R5 with outdoor light metering, 85mm f/1.4L lens at f/2.8 for environmental depth. Natural golden hour lighting, soft environmental fill, organic shadows. 8K hyperrealistic photography, natural outdoor authenticity, environmental integration. Natural outdoor color grading, environmental harmony, organic feel."
      },
      {
        id: "coworking-space",
        title: "Espaço Coworking",
        image: getTemplateThumbnail("coworking-space", "Espaço Coworking"),
        gender: "unisex",
        style: "creative",
        scenario: "office",
        description: "Profissional em ambiente colaborativo moderno",
        prompt: "Hyperrealistic professional photography, transform this person into psychologist working in modern coworking space while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as psychologist working in modern coworking space. Relaxed professional posture in home environment, modern professional posture. Creative professional attire that reflects innovative approach while maintaining professionalism, laptop and work materials. Inspiring confident expression, creative energy, innovative professional presence, inspired and connected expression. Modern therapeutic office environment. Collaborative and innovative environment, coworking space with contemporary elements. Shot with Canon EOS R5 with natural lighting adaptation, 85mm f/1.4L lens at f/2.0 for environmental separation. Soft window light from camera left, natural fill from environment. 8K hyperrealistic photography, authentic office ambiance, natural bokeh. Warm color grading, environmental realism, professional finish."
      },
      {
        id: "wellness-lifestyle",
        title: "Estilo Wellness",
        image: getTemplateThumbnail("wellness-lifestyle", "Estilo Wellness"),
        gender: "unisex",
        style: "creative",
        scenario: "home",
        description: "Integração entre bem-estar pessoal e prática profissional",
        prompt: "Hyperrealistic professional photography, transform this person into psychologist integrating personal wellness into professional practice while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as psychologist integrating personal wellness into professional practice. Relaxed professional posture in home environment. Creative professional attire that reflects innovative approach while maintaining professionalism, comfortable but elegant clothing. Inspiring confident expression, creative energy, innovative professional presence, balanced and serene expression. Well-organized home office environment. Environment mixing personal and professional elements, plants, natural elements, wellness aesthetics. Shot with Canon EOS R5 optimized for indoor natural light, 85mm f/1.4L lens at f/1.8 for intimate environmental context. Golden hour window light, warm ambient lighting from home environment. 8K hyperrealistic photography, domestic authenticity, cozy professional feel. Warm natural grading, home comfort enhancement, authentic lighting."
      },
      {
        id: "professional-networking",
        title: "Networking Profissional",
        image: getTemplateThumbnail("professional-networking", "Networking Profissional"),
        gender: "unisex",
        style: "business-casual",
        scenario: "office",
        description: "Evento de networking entre profissionais de saúde mental",
        prompt: "Hyperrealistic professional photography, transform this person into psychologist at professional networking event while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as psychologist at professional networking event. Confident professional posture facing camera directly, professional social interaction. Business casual shirt or quality sweater, professional but approachable, networking-appropriate attire. Warm genuine smile, approachable empathetic expression, naturally confident, confident and social expression. Modern therapeutic office environment. Professional event environment, other professionals in blurred background. Shot with Canon EOS R5 with natural lighting adaptation, 85mm f/1.4L lens at f/2.0 for environmental separation. Soft window light from camera left, natural fill from environment. 8K hyperrealistic photography, authentic office ambiance, natural bokeh. Warm color grading, environmental realism, professional finish."
      },
      {
        id: "mindful-break",
        title: "Pausa Mindful",
        image: getTemplateThumbnail("mindful-break", "Pausa Mindful"),
        gender: "unisex",
        style: "creative",
        scenario: "outdoor",
        description: "Momento de autocuidado e mindfulness profissional",
        prompt: "Hyperrealistic professional photography, transform this person into psychologist in mindful self-care moment while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as psychologist in mindful self-care moment. Natural relaxed posture in outdoor therapeutic setting, meditative or contemplative posture. Creative professional attire that reflects innovative approach while maintaining professionalism, comfortable clothing. Inspiring confident expression, creative energy, innovative professional presence, present and centered expression. Natural outdoor environment for alternative therapy. Environment promoting reflection, natural elements. Shot with Canon EOS R5 with outdoor light metering, 85mm f/1.4L lens at f/2.8 for environmental depth. Natural golden hour lighting, soft environmental fill, organic shadows. 8K hyperrealistic photography, natural outdoor authenticity, environmental integration. Natural outdoor color grading, environmental harmony, organic feel."
      }
    ]
  },
  {
    title: "Estúdio Criativo",
    description: "Retratos artísticos hiper-realísticos com preservação de identidade para branding",
    color: "#6366F1",
    icon: "Camera",
    templates: [
      {
        id: "studio-portrait-dramatic",
        title: "Retrato Dramático",
        image: getTemplateThumbnail("studio-portrait-dramatic", "Retrato Dramático"),
        gender: "female",
        style: "formal",
        scenario: "studio",
        description: "Retrato de estúdio com iluminação dramática e profissional",
        prompt: "Hyperrealistic professional photography, transform this woman into dramatic studio portrait for senior psychologist while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this woman as dramatic studio portrait for senior psychologist. Confident professional posture facing camera directly. Professional blazer in neutral tones over elegant blouse, sophisticated professional styling, structured beige or neutral blazer. Confident professional expression, warm empathetic smile, authoritative yet approachable, serious but empathetic expression. Professional photography studio environment. Clean neutral background in warm beige tones, soft bokeh with dramatic lighting accents. Shot with Canon EOS R5, professional studio setup, 85mm f/1.4L lens at f/2.8 for optimal sharpness. Three-point lighting setup with key light at 45°, soft fill light, subtle rim light, dramatic side lighting creating elegant contrast. 8K hyperrealistic photography, tack-sharp focus, professional depth of field. Natural color grading, professional skin retouching, magazine-quality finish."
      },
      {
        id: "creative-headshot",
        title: "Headshot Criativo",
        image: getTemplateThumbnail("creative-headshot", "Headshot Criativo"),
        gender: "unisex",
        style: "creative",
        scenario: "studio",
        description: "Retrato criativo para profissional inovador",
        prompt: "Hyperrealistic professional photography, transform this person into creative headshot for innovative psychologist while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as creative headshot for innovative psychologist. Confident professional posture facing camera directly. Creative professional attire that reflects innovative approach while maintaining professionalism, unique professional personality clothing. Inspiring confident expression, creative energy, innovative professional presence, expressing creativity and competence. Professional photography studio environment. Clean neutral background in warm beige tones, soft bokeh, artistic background, studio with creative elements. Shot with Canon EOS R5, professional studio setup, 85mm f/1.4L lens at f/2.8 for optimal sharpness. Three-point lighting setup with key light at 45°, soft fill light, subtle rim light, creative but professional lighting. 8K hyperrealistic photography, tack-sharp focus, professional depth of field. Natural color grading, professional skin retouching, magazine-quality finish."
      },
      {
        id: "artistic-portrait",
        title: "Retrato Artístico",
        image: getTemplateThumbnail("artistic-portrait", "Retrato Artístico"),
        gender: "unisex",
        style: "creative",
        scenario: "studio",
        description: "Composição artística para profissional diferenciado",
        prompt: "Hyperrealistic professional photography, transform this person into artistic portrait for differentiated psychologist while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as artistic portrait for differentiated psychologist. Confident professional posture facing camera directly, contemplative and sophisticated pose. Creative professional attire that reflects innovative approach while maintaining professionalism, elegant clothing. Inspiring confident expression, creative energy, innovative professional presence, thoughtful and deep expression. Professional photography studio environment. Clean neutral background in warm beige tones, soft bokeh, artistic studio, visual elements subtly referencing psychology. Shot with Canon EOS R5, professional studio setup, 85mm f/1.4L lens at f/2.8 for optimal sharpness. Three-point lighting setup with key light at 45°, soft fill light, subtle rim light, artistic lighting. 8K hyperrealistic photography, tack-sharp focus, professional depth of field. Natural color grading, professional skin retouching, magazine-quality finish."
      },
      {
        id: "minimalist-studio",
        title: "Estúdio Minimalista",
        image: getTemplateThumbnail("minimalist-studio", "Estúdio Minimalista"),
        gender: "unisex",
        style: "formal",
        scenario: "studio",
        description: "Composição clean e minimalista para marca profissional",
        prompt: "Hyperrealistic professional photography, transform this person into minimalist studio portrait for clean professional brand while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this person as minimalist studio portrait for clean professional brand. Confident professional posture facing camera directly, minimalist composition focused on person. Professional blazer in neutral tones over elegant blouse, sophisticated professional styling, elegant simple clothing. Confident professional expression, warm empathetic smile, authoritative yet approachable, natural and authentic expression. Professional photography studio environment. Clean neutral background in warm beige tones, soft bokeh, uniform neutral background, no distracting elements. Shot with Canon EOS R5, professional studio setup, 85mm f/1.4L lens at f/2.8 for optimal sharpness. Three-point lighting setup with key light at 45°, soft fill light, subtle rim light, soft and uniform lighting. 8K hyperrealistic photography, tack-sharp focus, professional depth of field. Natural color grading, professional skin retouching, magazine-quality finish."
      },
      {
        id: "professional-branding",
        title: "Branding Profissional",
        image: getTemplateThumbnail("professional-branding", "Branding Profissional"),
        gender: "female",
        style: "formal",
        scenario: "studio",
        description: "Retrato otimizado para identidade visual profissional",
        prompt: "Hyperrealistic professional photography, transform this woman into optimized portrait for professional branding while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this woman as optimized portrait for professional branding. Confident professional posture facing camera directly, pose aligned with brand identity. Professional blazer in neutral tones over elegant blouse, sophisticated professional styling, representing professional values. Confident professional expression, warm empathetic smile, authoritative yet approachable. Professional photography studio environment. Clean neutral background in warm beige tones, soft bokeh, background complementing personal brand. Shot with Canon EOS R5, professional studio setup, 85mm f/1.4L lens at f/2.8 for optimal sharpness. Three-point lighting setup with key light at 45°, soft fill light, subtle rim light, highlighting professionalism and confidence. 8K hyperrealistic photography, tack-sharp focus, professional depth of field. Natural color grading, professional skin retouching, magazine-quality finish."
      },
      {
        id: "dynamic-portrait",
        title: "Retrato Dinâmico",
        image: getTemplateThumbnail("dynamic-portrait", "Retrato Dinâmico"),
        gender: "female",
        style: "creative",
        scenario: "studio",
        description: "Retrato com energia e movimento para profissional ativo",
        prompt: "Hyperrealistic professional photography, transform this woman into dynamic portrait for active and energetic psychologist while maintaining 100% complete facial identity, bone structure, eye shape, nose profile, lip contour, and all unique facial characteristics intact. Same person, different professional context. this woman as dynamic portrait for active and energetic psychologist. Confident professional posture facing camera directly, pose with slight movement. Professional blazer in neutral tones over elegant blouse, sophisticated professional styling, elegant glasses, statement necklace, professional clothing with personality. Confident professional expression, warm empathetic smile, authoritative yet approachable, vibrant and engaged expression. Professional photography studio environment. Clean neutral background in warm beige tones, soft bokeh, background suggesting movement. Shot with Canon EOS R5, professional studio setup, 85mm f/1.4L lens at f/2.8 for optimal sharpness. Three-point lighting setup with key light at 45°, soft fill light, subtle rim light, lighting capturing energy. 8K hyperrealistic photography, tack-sharp focus, professional depth of field. Natural color grading, professional skin retouching, magazine-quality finish."
      }
    ]
  }
];

export const getCategoryBySlug = (slug: string): TemplateCategory | undefined => {
  return templateCategories.find(category =>
    category.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') === slug
  );
};

// Function to pregenerate all thumbnails (useful for performance)
export const pregenerateThumbnails = async (): Promise<void> => {
  const allTemplates = templateCategories.flatMap(category =>
    category.templates.map(template => ({
      id: template.id,
      title: template.title
    }))
  );

  for (const template of allTemplates) {
    getTemplateThumbnail(template.id, template.title);
  }

  console.log(`✅ Pre-generated ${allTemplates.length} thumbnails específicas para saúde mental`);
};