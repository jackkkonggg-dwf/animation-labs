export interface NavigationRoute {
  id: string;
  title: string;
  description: string;
  path: string;
  category?: string;
}

export interface NavigationData {
  homeRoute: NavigationRoute;
  routes: NavigationRoute[];
}
