import { ClientConfig } from './types';
import { config as clientA } from './clients/client-a';
import { config as clientB } from './clients/client-b';
import { config as clientC } from './clients/client-c';

declare const __CLIENT_ID__: string;

const configs: Record<string, ClientConfig> = {
  'client-a': clientA,
  'client-b': clientB,
  'client-c': clientC,
};

export const currentConfig: ClientConfig = configs[__CLIENT_ID__] || clientA;

export const isFeatureEnabled = (featureKey: keyof ClientConfig['features']): boolean => {
  return !!currentConfig.features[featureKey];
};

export const hasModule = (moduleName: string): boolean => {
  return currentConfig.modules.includes(moduleName);
};

export const getWelcomeModules = () => {
  return [...currentConfig.welcomePage.modules]
    .filter((m) => m.visible)
    .sort((a, b) => a.order - b.order);
};
