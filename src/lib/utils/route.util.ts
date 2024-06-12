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

export const urlBuilder = <T = AppRoute>(
  route: T,
  options?: {
    params?: Record<string, string>;
    query?: Record<string, string>;
  }
): string => {
  let url = String(route);

  if (!options) return url;
  const { params, query } = options;

  if (params) {
    url = Object.entries(params).reduce((prevUrl, [key, value]) => {
      return prevUrl.replace(`[${key}]`, value);
    }, url);
  }

  if (query) {
    const queryString = new URLSearchParams(query).toString();
    url += `?${queryString}`;
  }

  if (url.includes('[')) {
    throw new Error('Missing params');
  }

  return url;
};
