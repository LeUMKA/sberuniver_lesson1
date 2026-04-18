export const routes = {
  home: () => import('./pages/home'),
  about: () => import('./pages/about'),
} as const;
