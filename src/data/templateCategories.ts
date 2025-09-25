// Sistema completo de templates para profissionais de saúde mental
// Baseado em análise visual das referências com prompts otimizados NanoBanana
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

// Mapeamento de imagens de referência específicas para profissionais de saúde mental
// Organizadas por características visuais e cenários apropriados
const mentalHealthReferenceMapping: Record<string, string> = {
  // Retratos Profissionais - Headshots e LinkedIn
  'professional-headshot-male-formal': '/Referencia_img_prompt/8b679a8e85572fa52abe386fb703c7db.jpg', // Homem sorrindo profissional
  'professional-headshot-female-formal': '/Referencia_img_prompt/fcbf9043fba4c1d155c79ddcbbcc2f2d.jpg', // Mulher blazer confiante
  'linkedin-portrait-male-casual': '/Referencia_img_prompt/5979a3263236ad5c98edf21fd059de33.jpg', // Homem ambiente descontraído
  'linkedin-portrait-female-casual': '/Referencia_img_prompt/2a85f7637a6784a15d67839ad4dbc646.jpg', // Mulher óculos sorrindo
  'executive-portrait-female': '/Referencia_img_prompt/5cf10bdea2d17717b8d92ae41ae16e7f.jpg', // Mulher blazer bege formal
  'friendly-headshot-male': '/Referencia_img_prompt/96a892ae66af8001fa2fdd0a9de1be3d.jpg', // Homem luz natural sorrindo

  // Consultório & Terapia - Ambientes terapêuticos
  'therapy-session-female': '/Referencia_img_prompt/af247a85180365abf528c9d0cb1a8f8f.jpg', // Mulher videochamada profissional
  'consultation-room-female': '/Referencia_img_prompt/98bddbaacadf0d38cbb3ad9bac1edffc.jpg', // Mulher lendo consultório plantas
  'group-therapy-facilitator': '/Referencia_img_prompt/68b92bd638fb43baaeddd05e461589a5.jpg', // Ambiente acolhedor profissional
  'clinical-assessment': '/Referencia_img_prompt/98efeba94ed21727d7a11cf0cba18477.jpg', // Ambiente clínico organizado
  'therapeutic-conversation': '/Referencia_img_prompt/e888e9bd03310fa74d9fce3e4d7323d9.jpg', // Conversa terapêutica
  'family-therapy-setting': '/Referencia_img_prompt/c5dc29de97954f5d6ac1528782e979ab.jpg', // Ambiente familiar acolhedor

  // Home Office & Teleconsulta
  'home-office-consultation': '/Referencia_img_prompt/090d55dd737e282186daa3e6b8b1a759.jpg', // Home office múltiplas poses
  'video-therapy-session': '/Referencia_img_prompt/79706985f4d21de08759e1af10ee42f0.jpg', // Videochamada profissional
  'online-counseling-male': '/Referencia_img_prompt/0c6c8e72d4a991e2feea97eb7f240bb7.jpg', // Homem ambiente moderno
  'teletherapy-setup': '/Referencia_img_prompt/354ff031c5b225c11a8ca76d9903d33e.jpg', // Setup teleconsulta
  'remote-consultation': '/Referencia_img_prompt/5e62fc17b2498c17a0705e31b482733e.jpg', // Consulta remota organizada
  'digital-therapy-female': '/Referencia_img_prompt/743c04fb8dc745828a473633c9c8f54b.jpg', // Mulher ambiente digital

  // Workshops & Palestras
  'workshop-presenter-female': '/Referencia_img_prompt/9817ffd52ce0d111bc423f339d49ee26.jpg', // Mulher apresentando
  'seminar-speaker-male': '/Referencia_img_prompt/a0bfb042d4bcd71a55d3713062107e04.jpg', // Homem palestrando
  'training-facilitator': '/Referencia_img_prompt/aea67a524a8d4add363ac4de89ad041f.jpg', // Facilitador treinamento
  'conference-presenter': '/Referencia_img_prompt/a936b361e02a67cd05a58427495f1eff.jpg', // Apresentação conferência
  'workshop-interaction': '/Referencia_img_prompt/12078184ea46bdbd2390c9c4f92aaa66.jpg', // Interação workshop
  'educational-speaker': '/Referencia_img_prompt/1611430379f0a847cd38f99ad725659e.jpg', // Palestrante educacional

  // Lifestyle Profissional
  'coffee-consultation': '/Referencia_img_prompt/1e23165b906b0b0c28a15f11bc5330d8.jpg', // Consulta descontraída
  'outdoor-therapy-walk': '/Referencia_img_prompt/1ecd432f61b6685192d6f99bca37d445.jpg', // Terapia ao ar livre
  'coworking-space': '/Referencia_img_prompt/20ac5fa7d4837201981f7bc7808214bd.jpg', // Espaço coworking
  'wellness-lifestyle': '/Referencia_img_prompt/28340bb452e13674f93702a1e1966b2c.jpg', // Lifestyle bem-estar
  'professional-networking': '/Referencia_img_prompt/294acd061150869e34a5d29dea230bb8.jpg', // Networking profissional
  'mindful-break': '/Referencia_img_prompt/2de52cf34761786f56a12ce8546fccb8.jpg', // Pausa mindful

  // Estúdio Criativo
  'studio-portrait-dramatic': '/Referencia_img_prompt/6cd98f1c9ab6bebc049e27bcc74a28aa.jpg', // Retrato dramático estúdio
  'creative-headshot': '/Referencia_img_prompt/28340bb452e13674f93702a1e1966b2c.jpg', // Headshot criativo
  'artistic-portrait': '/Referencia_img_prompt/e5969210290cd79b4b33bfa2e8863677.jpg', // Retrato artístico
  'minimalist-studio': '/Referencia_img_prompt/5cf10bdea2d17717b8d92ae41ae16e7f.jpg', // Estúdio minimalista
  'professional-branding': '/Referencia_img_prompt/fcbf9043fba4c1d155c79ddcbbcc2f2d.jpg', // Branding profissional
  'dynamic-portrait': '/Referencia_img_prompt/2a85f7637a6784a15d67839ad4dbc646.jpg' // Retrato dinâmico
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
        prompt: "Transforme o homem da foto em psicólogo profissional confiante. Mantenha todas as características faciais e identidade originais intocadas. Sorriso caloroso e profissional, olhar direto e empático, blazer escuro ou camisa social de qualidade. Fundo neutro desfocado tons terrosos, iluminação natural suave estilo window light, lente retrato 85mm. Expressão acolhedora mas autoridade profissional, postura confiante, adequado para terapeuta ou conselheiro. Estilo fotorrealista seguindo tons das referências com paleta neutra e quente."
      },
      {
        id: "professional-headshot-female-formal",
        title: "Retrato Feminino Formal",
        image: getTemplateThumbnail("professional-headshot-female-formal", "Retrato Feminino Formal"),
        gender: "female",
        style: "formal",
        scenario: "studio",
        description: "Headshot profissional feminino elegante e confiante",
        prompt: "Transforme a mulher da foto em psicóloga profissional elegante. Preserve completamente traços faciais e identidade original. Sorriso genuíno e acolhedor, olhar empático e confiante, blazer estruturado ou roupa social feminina em tons neutros. Mão apoiada elegantemente, postura corporal confiante. Fundo desfocado em tons beiges e cinzas claros, iluminação profissional suave golden hour. Lente 85mm retrato, estilo das referências com tons terrosos, adequada para terapeuta especializada."
      },
      {
        id: "linkedin-portrait-male-casual",
        title: "LinkedIn Masculino Casual",
        image: getTemplateThumbnail("linkedin-portrait-male-casual", "LinkedIn Masculino Casual"),
        gender: "male",
        style: "business-casual",
        scenario: "office",
        description: "Retrato descontraído mas profissional para redes sociais",
        prompt: "Crie retrato de psicólogo masculino em ambiente descontraído mas profissional. Mantenha identidade facial completa. Sorriso natural e acessível, camisa social sem gravata ou suéter de qualidade, ambiente de escritório moderno com plantas ao fundo. Iluminação natural difusa, tons quentes e terrosos das referências. Lente 85mm, profundidade de campo suave, expressão amigável e competente, adequado para LinkedIn de terapeuta."
      },
      {
        id: "linkedin-portrait-female-casual",
        title: "LinkedIn Feminino Casual",
        image: getTemplateThumbnail("linkedin-portrait-female-casual", "LinkedIn Feminino Casual"),
        gender: "female",
        style: "business-casual",
        scenario: "office",
        description: "Retrato feminino acessível com óculos e sorriso caloroso",
        prompt: "Transforme a mulher em psicóloga acessível e calorosa. Preserve traços faciais originais. Óculos elegantes, sorriso genuíno, blusa ou suéter em tons neutros, colar discreto. Caderno ou material de trabalho nas mãos, ambiente de consultório acolhedor com sofás ao fundo desfocado. Iluminação natural suave, paleta de cores das referências, lente 85mm retrato. Expressão empática e profissional, adequada para terapeuta que trabalha com famílias."
      },
      {
        id: "executive-portrait-female",
        title: "Retrato Executivo Feminino",
        image: getTemplateThumbnail("executive-portrait-female", "Retrato Executivo Feminino"),
        gender: "female",
        style: "formal",
        scenario: "studio",
        description: "Retrato formal com iluminação dramática e elegante",
        prompt: "Crie retrato de psicóloga especialista sênior em ambiente de estúdio elegante. Mantenha características faciais originais. Blazer bege ou neutro de alta qualidade, postura autoritativa mas acessível, olhar direto e confiante. Fundo escuro desfocado com iluminação lateral dramática, estilo das referências com tons terrosos. Lente 85mm, alta qualidade, expressão séria mas empática, adequada para diretora clínica ou supervisora de terapeutas."
      },
      {
        id: "friendly-headshot-male",
        title: "Retrato Masculino Acolhedor",
        image: getTemplateThumbnail("friendly-headshot-male", "Retrato Masculino Acolhedor"),
        gender: "male",
        style: "business-casual",
        scenario: "office",
        description: "Retrato caloroso com luz natural e expressão acolhedora",
        prompt: "Transforme o homem em psicólogo acolhedor em ambiente com luz natural dourada. Preserve identidade facial original. Sorriso caloroso e genuíno, camisa clara, postura relaxada mas profissional, luz natural golden hour suave. Ambiente moderno ao fundo desfocado, tons quentes das referências. Lente 85mm, profundidade controlada, expressão empática e confiável, adequado para terapeuta especializado em relacionamentos."
      }
    ]
  },
  {
    title: "Consultório & Terapia",
    description: "Ambientes terapêuticos acolhedores para sessões e consultas",
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
        prompt: "Transforme a mulher em terapeuta durante videochamada terapêutica. Preserve identidade facial original. Gesticulando de forma acolhedora, blazer profissional sobre blusa neutra, sorriso empático e caloroso. Ambiente de consultório moderno com plantas e elementos naturais ao fundo, iluminação natural suave de janela. Lente 85mm, tons terrosos das referências, expressão que transmite segurança e acolhimento, adequada para psicóloga em atendimento online."
      },
      {
        id: "consultation-room-female",
        title: "Consultório Acolhedor",
        image: getTemplateThumbnail("consultation-room-female", "Consultório Acolhedor"),
        gender: "female",
        style: "clinical",
        scenario: "office",
        description: "Psicóloga lendo em ambiente com plantas e atmosfera calma",
        prompt: "Crie psicóloga em momento de estudo em consultório aconchegante. Mantenha características faciais originais. Lendo caderno ou livro de psicologia, vestido verde ou roupa neutra confortável, postura relaxada em sofá com almofadas. Consultório com plantas abundantes, velas, iluminação golden hour natural, ambiente que transmite calma e acolhimento. Lente 85mm, paleta terrosa das referências, expressão serena e profissional."
      },
      {
        id: "group-therapy-facilitator",
        title: "Facilitador Terapia de Grupo",
        image: getTemplateThumbnail("group-therapy-facilitator", "Facilitador Terapia de Grupo"),
        gender: "unisex",
        style: "clinical",
        scenario: "office",
        description: "Profissional em ambiente preparado para sessões em grupo",
        prompt: "Transforme a pessoa em facilitador de terapia de grupo em ambiente acolhedor. Preserve traços faciais originais. Roupa profissional acolhedora, expressão empática e inclusiva, postura que transmite liderança gentil. Sala preparada para grupo com cadeiras em círculo, plantas, iluminação natural difusa, elementos que promovem união e segurança emocional. Estilo das referências com tons quentes, lente 85mm retrato."
      },
      {
        id: "clinical-assessment",
        title: "Avaliação Clínica",
        image: getTemplateThumbnail("clinical-assessment", "Avaliação Clínica"),
        gender: "unisex",
        style: "clinical",
        scenario: "office",
        description: "Psicólogo em ambiente clínico organizado",
        prompt: "Crie psicólogo em ambiente de avaliação clínica organizado e profissional. Mantenha identidade facial. Jaleco ou roupa profissional clínica, materiais de avaliação psicológica, testes e questionários organizados. Ambiente limpo e profissional com diplomas, certificações, mesa de trabalho estruturada. Iluminação profissional clara, expressão competente e confiável, lente 85mm, tons neutros das referências."
      },
      {
        id: "therapeutic-conversation",
        title: "Conversa Terapêutica",
        image: getTemplateThumbnail("therapeutic-conversation", "Conversa Terapêutica"),
        gender: "unisex",
        style: "clinical",
        scenario: "office",
        description: "Momento de diálogo empático com paciente",
        prompt: "Transforme a pessoa em terapeuta durante conversa acolhedora com paciente. Preserve características faciais. Postura de escuta ativa, mãos em posição receptiva, expressão empática e presente. Consultório com poltronas confortáveis, ambiente que transmite segurança psicológica, plantas e elementos naturais. Iluminação suave natural, tons das referências, lente 85mm, transmitindo presença terapêutica e conexão humana."
      },
      {
        id: "family-therapy-setting",
        title: "Terapia Familiar",
        image: getTemplateThumbnail("family-therapy-setting", "Terapia Familiar"),
        gender: "unisex",
        style: "clinical",
        scenario: "home",
        description: "Especialista em terapia familiar em ambiente acolhedor",
        prompt: "Crie especialista em terapia familiar em ambiente caloroso e acolhedor. Mantenha identidade facial original. Roupa profissional mas calorosa, expressão maternal/paternal, postura que convida à confiança familiar. Ambiente decorado para famílias com elementos naturais, cores suaves, espaço amplo e confortável. Iluminação natural golden hour, estilo das referências com paleta terrosa, lente 85mm, transmitindo segurança familiar."
      }
    ]
  },
  {
    title: "Home Office & Teleconsulta",
    description: "Profissionais em atendimento online e escritório doméstico",
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
        prompt: "Transforme a mulher em terapeuta profissional em home office organizado. Preserve identidade facial. Blazer marrom sobre blusa clara, poses variadas: trabalhando no laptop, tomando café, fazendo anotações. Escritório em casa bem estruturado com mesa de madeira, plantas, caneca laranja, materiais de trabalho organizados. Iluminação natural de janela, tons terrosos das referências, múltiplas poses mostrando rotina profissional, lente 85mm."
      },
      {
        id: "video-therapy-session",
        title: "Sessão por Vídeo",
        image: getTemplateThumbnail("video-therapy-session", "Sessão por Vídeo"),
        gender: "unisex",
        style: "business-casual",
        scenario: "home",
        description: "Terapeuta em videochamada com setup profissional",
        prompt: "Crie terapeuta em videochamada profissional bem configurada. Mantenha características faciais originais. Falando diretamente com a câmera, gesticulação acolhedora, roupa profissional casual, expressão empática durante atendimento online. Setup com boa iluminação, fundo organizado, ambiente doméstico profissional. Iluminação técnica adequada para vídeo, tons das referências, lente 85mm, transmitindo presença terapêutica virtual."
      },
      {
        id: "online-counseling-male",
        title: "Aconselhamento Online Masculino",
        image: getTemplateThumbnail("online-counseling-male", "Aconselhamento Online Masculino"),
        gender: "male",
        style: "business-casual",
        scenario: "home",
        description: "Psicólogo masculino em ambiente moderno de teleconsulta",
        prompt: "Transforme o homem em psicólogo especializado em atendimento online. Preserve identidade facial. Camisa social casual ou suéter, ambiente moderno e tecnológico, setup profissional para teleconsultas. Expressão confiante mas acessível, postura profissional adaptada ao digital. Home office moderno com elementos tech, iluminação adequada para vídeo, tons das referências, lente 85mm, adequado para especialista em psicologia digital."
      },
      {
        id: "teletherapy-setup",
        title: "Setup Teleterapia",
        image: getTemplateThumbnail("teletherapy-setup", "Setup Teleterapia"),
        gender: "unisex",
        style: "creative",
        scenario: "home",
        description: "Configuração profissional para atendimento remoto",
        prompt: "Crie terapeuta com setup otimizado para teleterapia. Mantenha traços faciais originais. Ambiente criativo mas profissional, equipamentos de qualidade, iluminação técnica adequada, fundo que transmite profissionalismo. Roupa adequada para vídeo, cores que funcionam bem na tela. Postura e expressão adaptadas para atendimento digital, tons das referências, lente 85mm, mostrando expertise em terapia digital moderna."
      },
      {
        id: "remote-consultation",
        title: "Consulta Remota",
        image: getTemplateThumbnail("remote-consultation", "Consulta Remota"),
        gender: "unisex",
        style: "business-casual",
        scenario: "home",
        description: "Sessão de consulta psicológica à distância",
        prompt: "Transforme a pessoa em especialista em consultas remotas bem organizadas. Preserve características faciais. Mesa de trabalho estruturada, materiais organizados, ambiente doméstico profissional otimizado para atendimento. Roupa profissional casual, expressão focada e acolhedora. Iluminação natural adequada, tons terrosos das referências, lente 85mm, transmitindo competência em atendimento psicológico remoto."
      },
      {
        id: "digital-therapy-female",
        title: "Terapia Digital Feminina",
        image: getTemplateThumbnail("digital-therapy-female", "Terapia Digital Feminina"),
        gender: "female",
        style: "creative",
        scenario: "home",
        description: "Terapeuta feminina especializada em ambiente digital",
        prompt: "Crie terapeuta feminina especializada em terapia digital moderna. Mantenha identidade facial original. Ambiente zen adaptado para digital, elementos que transmitem calma através da tela, setup mindful para atendimento online. Roupa que funciona bem digitalmente, expressão serena e presente adaptada para conexão virtual. Iluminação suave natural, paleta das referências, lente 85mm, mostrando expertise em mindfulness digital."
      }
    ]
  },
  {
    title: "Workshops & Palestras",
    description: "Apresentações, treinamentos e eventos para profissionais",
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
        prompt: "Transforme a mulher em palestrante especialista em psicologia. Preserve identidade facial original. Gesticulando durante apresentação, blazer profissional, expressão confiante e didática. Ambiente de apresentação com materiais educativos, postura de educadora experiente. Iluminação de auditório profissional, tons das referências, lente 85mm, transmitindo autoridade acadêmica e capacidade de ensinar, adequada para workshops de psicologia."
      },
      {
        id: "seminar-speaker-male",
        title: "Palestrante Masculino",
        image: getTemplateThumbnail("seminar-speaker-male", "Palestrante Masculino"),
        gender: "male",
        style: "formal",
        scenario: "office",
        description: "Especialista masculino apresentando para audiência profissional",
        prompt: "Crie psicólogo masculino como palestrante de seminário profissional. Mantenha características faciais. Terno ou blazer elegante, postura de apresentador experiente, gesticulação didática e envolvente. Ambiente acadêmico ou de conferência, materiais de apresentação ao fundo. Iluminação profissional de auditório, expressão autoridade acadêmica mas acessível, tons das referências, lente 85mm, adequado para seminários de saúde mental."
      },
      {
        id: "training-facilitator",
        title: "Facilitador de Treinamento",
        image: getTemplateThumbnail("training-facilitator", "Facilitador de Treinamento"),
        gender: "unisex",
        style: "business-casual",
        scenario: "office",
        description: "Instrutor conduzindo treinamento em habilidades terapêuticas",
        prompt: "Transforme a pessoa em facilitador de treinamento em habilidades terapêuticas. Preserve traços faciais originais. Roupa profissional acessível, postura de educador experiente, ambiente de treinamento com recursos didáticos. Expressão engajante e motivadora, capacidade de conexão com grupos. Iluminação de sala de treinamento, tons das referências, lente 85mm, transmitindo expertise pedagógica em psicologia aplicada."
      },
      {
        id: "conference-presenter",
        title: "Apresentador de Conferência",
        image: getTemplateThumbnail("conference-presenter", "Apresentador de Conferência"),
        gender: "unisex",
        style: "formal",
        scenario: "office",
        description: "Especialista apresentando em conferência de saúde mental",
        prompt: "Crie especialista apresentando em conferência de saúde mental. Mantenha identidade facial. Roupa formal de palestrante, ambiente de conferência profissional, materiais de apresentação acadêmica. Postura de autoridade no assunto, expressão competente e inspiradora. Iluminação de evento profissional, tons das referências, lente 85mm, transmitindo liderança intelectual e expertise em psicologia clínica."
      },
      {
        id: "workshop-interaction",
        title: "Interação em Workshop",
        image: getTemplateThumbnail("workshop-interaction", "Interação em Workshop"),
        gender: "unisex",
        style: "business-casual",
        scenario: "office",
        description: "Momento de interação dinâmica com participantes",
        prompt: "Transforme a pessoa em facilitador durante interação dinâmica em workshop. Preserve características faciais. Movimento de interação com grupo, gesticulação inclusiva, roupa que permite movimento. Ambiente de workshop interativo, materiais de atividade grupal. Expressão entusiasmada e acolhedora, capacidade de envolver participantes. Iluminação natural de workshop, tons das referências, lente 85mm, mostrando habilidades de facilitação grupal."
      },
      {
        id: "educational-speaker",
        title: "Palestrante Educacional",
        image: getTemplateThumbnail("educational-speaker", "Palestrante Educacional"),
        gender: "unisex",
        style: "creative",
        scenario: "office",
        description: "Educador em psicologia para diferentes públicos",
        prompt: "Crie educador especializado em psicologia para diversos públicos. Mantenha identidade facial original. Roupa versátil para diferentes contextos, postura de educador adaptável, materiais educativos variados. Ambiente que serve múltiplos propósitos educacionais. Expressão didática e inspiradora, capacidade de adaptar linguagem. Iluminação educacional, tons das referências, lente 85mm, adequado para educação em saúde mental em vários contextos."
      }
    ]
  },
  {
    title: "Lifestyle Profissional",
    description: "Profissionais equilibrando vida pessoal e carreira",
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
        prompt: "Transforme a pessoa em terapeuta em consulta informal descontraída. Preserve identidade facial original. Ambiente de café ou espaço acolhedor, roupa business casual, expressão calorosa e acessível. Postura relaxada mas profissional, transmitindo que terapia pode ser acessível. Iluminação natural suave, tons das referências, lente 85mm, mostrando abordagem terapêutica humanizada e próxima, adequada para psicólogo com abordagem inovadora."
      },
      {
        id: "outdoor-therapy-walk",
        title: "Terapia Caminhando",
        image: getTemplateThumbnail("outdoor-therapy-walk", "Terapia Caminhando"),
        gender: "unisex",
        style: "creative",
        scenario: "outdoor",
        description: "Sessão terapêutica ao ar livre em movimento",
        prompt: "Crie terapeuta especializado em terapia ao ar livre em movimento. Mantenha características faciais. Roupa apropriada para atividade externa, ambiente natural, postura dinâmica de caminhada terapêutica. Expressão presente e conectada com a natureza. Cenário externo natural, iluminação golden hour, tons das referências, lente 85mm, transmitindo abordagem terapêutica inovadora que integra movimento e natureza no processo de cura."
      },
      {
        id: "coworking-space",
        title: "Espaço Coworking",
        image: getTemplateThumbnail("coworking-space", "Espaço Coworking"),
        gender: "unisex",
        style: "creative",
        scenario: "office",
        description: "Profissional em ambiente colaborativo moderno",
        prompt: "Transforme a pessoa em psicólogo trabalhando em coworking moderno. Preserve traços faciais originais. Ambiente colaborativo e inovador, laptop e materiais de trabalho, roupa criativa mas profissional. Expressão inspirada e conectada, postura de profissional moderno. Espaço coworking com elementos contemporâneos, iluminação natural, tons das referências, lente 85mm, mostrando psicólogo adaptado aos novos formatos de trabalho."
      },
      {
        id: "wellness-lifestyle",
        title: "Estilo Wellness",
        image: getTemplateThumbnail("wellness-lifestyle", "Estilo Wellness"),
        gender: "unisex",
        style: "creative",
        scenario: "home",
        description: "Integração entre bem-estar pessoal e prática profissional",
        prompt: "Crie psicólogo que integra wellness pessoal à prática profissional. Mantenha identidade facial. Ambiente que mistura elementos pessoais e profissionais, plantas, elementos naturais, estética wellness. Roupa confortável mas elegante, expressão equilibrada e serena. Iluminação natural suave, tons terrosos das referências, lente 85mm, transmitindo modelo de profissional que pratica o que ensina sobre equilíbrio e bem-estar."
      },
      {
        id: "professional-networking",
        title: "Networking Profissional",
        image: getTemplateThumbnail("professional-networking", "Networking Profissional"),
        gender: "unisex",
        style: "business-casual",
        scenario: "office",
        description: "Evento de networking entre profissionais de saúde mental",
        prompt: "Transforme a pessoa em psicólogo em evento de networking profissional. Preserve características faciais. Interação social profissional, roupa apropriada para networking, expressão confiante e social. Ambiente de evento profissional, outros profissionais ao fundo desfocado. Postura sociável mas autoridade profissional, tons das referências, lente 85mm, transmitindo capacidade de construir relacionamentos profissionais sólidos na área da saúde mental."
      },
      {
        id: "mindful-break",
        title: "Pausa Mindful",
        image: getTemplateThumbnail("mindful-break", "Pausa Mindful"),
        gender: "unisex",
        style: "creative",
        scenario: "outdoor",
        description: "Momento de autocuidado e mindfulness profissional",
        prompt: "Crie psicólogo em momento de pausa mindful e autocuidado. Mantenha identidade facial original. Postura meditativa ou contemplativa, ambiente que promove reflexão, elementos naturais. Roupa confortável, expressão presente e centrada. Demonstrando importância do autocuidado profissional. Iluminação natural serena, tons das referências, lente 85mm, mostrando modelo de profissional que valoriza seu próprio bem-estar como base para ajudar outros."
      }
    ]
  },
  {
    title: "Estúdio Criativo",
    description: "Retratos artísticos e criativos para branding profissional",
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
        prompt: "Transforme a mulher em retrato dramático de estúdio para psicóloga sênior. Preserve identidade facial original. Blazer estruturado bege ou neutro, iluminação lateral dramática criando contraste elegante. Fundo neutro de estúdio, postura autoritativa mas acessível. Expressão séria mas empática, adequada para especialista renomada. Lente 85mm, estilo editorial das referências com tons terrosos, alta qualidade para materiais promocionais profissionais."
      },
      {
        id: "creative-headshot",
        title: "Headshot Criativo",
        image: getTemplateThumbnail("creative-headshot", "Headshot Criativo"),
        gender: "unisex",
        style: "creative",
        scenario: "studio",
        description: "Retrato criativo para profissional inovador",
        prompt: "Crie headshot criativo para psicólogo com abordagem inovadora. Mantenha características faciais. Iluminação criativa mas profissional, fundo artístico, roupa que reflete personalidade profissional única. Postura confiante mas acessível, expressão que transmite criatividade e competência. Estúdio com elementos criativos, tons das referências, lente 85mm, adequado para profissional que combina arte e terapia."
      },
      {
        id: "artistic-portrait",
        title: "Retrato Artístico",
        image: getTemplateThumbnail("artistic-portrait", "Retrato Artístico"),
        gender: "unisex",
        style: "creative",
        scenario: "studio",
        description: "Composição artística para profissional diferenciado",
        prompt: "Transforme a pessoa em retrato artístico para psicólogo diferenciado. Preserve traços faciais originais. Composição criativa, iluminação artística, pose contemplativa e sofisticada. Elementos visuais que remetem à psicologia de forma sutil e elegante. Roupa elegante, expressão pensativa e profunda. Estúdio artístico, tons das referências, lente 85mm, transmitindo profundidade intelectual e sensibilidade artística."
      },
      {
        id: "minimalist-studio",
        title: "Estúdio Minimalista",
        image: getTemplateThumbnail("minimalist-studio", "Estúdio Minimalista"),
        gender: "unisex",
        style: "formal",
        scenario: "studio",
        description: "Composição clean e minimalista para marca profissional",
        prompt: "Crie retrato minimalista de estúdio para marca profissional clean. Mantenha identidade facial. Fundo neutro uniforme, iluminação suave e uniforme, composição minimalista focada na pessoa. Roupa elegante simples, expressão natural e auténtica. Sem elementos que distraiam, foco total no profissional. Estilo das referências com paleta neutra, lente 85mm, adequado para branding profissional sofisticado e atemporal."
      },
      {
        id: "professional-branding",
        title: "Branding Profissional",
        image: getTemplateThumbnail("professional-branding", "Branding Profissional"),
        gender: "female",
        style: "formal",
        scenario: "studio",
        description: "Retrato otimizado para identidade visual profissional",
        prompt: "Transforme a mulher em retrato otimizado para branding profissional. Preserve características faciais. Pose e expressão alinhadas com identidade de marca, roupa que representa valores profissionais. Iluminação que destaca profissionalismo e confiança. Fundo que complementa marca pessoal. Estúdio profissional, tons das referências, lente 85mm, criando imagem consistente para todos os materiais de marketing profissional."
      },
      {
        id: "dynamic-portrait",
        title: "Retrato Dinâmico",
        image: getTemplateThumbnail("dynamic-portrait", "Retrato Dinâmico"),
        gender: "female",
        style: "creative",
        scenario: "studio",
        description: "Retrato com energia e movimento para profissional ativo",
        prompt: "Crie retrato dinâmico para psicóloga ativa e energética. Mantenha identidade facial original. Óculos elegantes, colar statement, pose com ligeiro movimento, expressão vibrante e engajada. Iluminação que capture energia, fundo que sugira movimento. Roupa profissional com personalidade, tons das referências, lente 85mm, transmitindo dinamismo e paixão pela profissão, adequada para psicóloga que trabalha ativamente com mudanças."
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