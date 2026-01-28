import type { Difficulty } from './pattern';

export interface NavigationRoute {
  id: string;
  title: string;
  description: string;
  path: string;
  category?: string;
  difficulty?: Difficulty;
}

export interface NavigationData {
  homeRoute: NavigationRoute;
  routes: NavigationRoute[];
}
