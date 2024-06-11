import { AppRoute } from '$lib/constants';
import type { AppRoutesConfigs, RouteConfigs } from '$lib/types';

export const getRouteConfigs = (
  appRoutesConfigs: AppRoutesConfigs,
  path: string,
  params: Partial<Record<string, string>>
): RouteConfigs | null => {
  const reversePath = Object.entries(params).reduce((previousPath, [key, value]) => {
    if (!value) return previousPath;
    return previousPath.split(value).join(`[${key}]`);
  }, path);

  const route = Object.values(AppRoute).find((route) => reversePath === route);

  if (!route) return null;
  return appRoutesConfigs[route];
};
