export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  label: string;
  icon?: React.ReactNode;
}

export interface AppRoute extends RouteConfig {
  children?: RouteConfig[];
}

export const ROUTES = {
  HOME: '/',
  UPLOAD: '/upload',
  MODEL_CONFIG: '/model-config',
  RESULTS: '/results',
  DASHBOARD: '/dashboard',
  MENU_PREDICTIONS: '/menu-predictions',
} as const;

export type RouteKey = keyof typeof ROUTES; 