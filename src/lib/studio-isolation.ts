/**
 * Studio Isolation Context
 * 
 * Este arquivo garante que o Psynka Studio seja completamente isolado
 * do sistema principal, evitando conflitos de navegação e sessão.
 */

// Chave única para localStorage do Studio
export const STUDIO_STORAGE_PREFIX = 'studio-';

// Headers específicos do Studio para identificação
export const STUDIO_HEADERS = {
  'X-Client-Info': 'psynka-studio-web',
  'X-Project-Context': 'studio',
  'X-Studio-Version': '1.0.0',
} as const;

// URLs específicas do Studio (não deve redirecionar para Psynka principal)
export const STUDIO_ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  DASHBOARD: '/generate',
  GALLERY: '/gallery',
  PROFILE: '/profile',
  ADMIN: '/admin',
} as const;

// Função para verificar se estamos no contexto do Studio
export const isStudioContext = (): boolean => {
  return window.location.hostname.includes('studio') || 
         window.location.pathname.includes('studio') ||
         localStorage.getItem('studio-context') === 'active';
};

// Função para marcar contexto como Studio
export const setStudioContext = (): void => {
  localStorage.setItem('studio-context', 'active');
  localStorage.setItem('studio-session-start', Date.now().toString());
};

// Função para verificar se o usuário pertence ao Studio
export const isStudioUser = (email: string): boolean => {
  // Domínios específicos do Studio
  const studioDomains = ['@studio.psynka.com', '@studio.'];
  return studioDomains.some(domain => email.includes(domain));
};

// Função para limpar dados de sessão se necessário
export const clearCrossProjectData = (): void => {
  // Remove apenas dados que podem causar conflito
  const keysToCheck = Object.keys(localStorage);
  keysToCheck.forEach(key => {
    if (key.includes('psynka') && !key.includes('studio')) {
      localStorage.removeItem(key);
    }
  });
};

// Inicializa contexto do Studio
if (typeof window !== 'undefined') {
  setStudioContext();
}