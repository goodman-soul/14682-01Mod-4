export type WelcomeModuleType =
  | 'project-progress'
  | 'training-entry'
  | 'announcements'
  | 'hotline'
  | 'custom-link';

export interface WelcomePageModule {
  id: string;
  type: WelcomeModuleType;
  title: string;
  order: number;
  visible: boolean;
  link?: string;
  props?: Record<string, any>;
}

export interface WelcomePageConfig {
  modules: WelcomePageModule[];
}

export interface ClientConfig {
  id: string;
  name: string;
  features: {
    enableAnalytics: boolean;
    enableSocialSharing: boolean;
    enableAdvancedSearch: boolean;
    [key: string]: boolean;
  };
  modules: string[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    borderRadius: string;
  };
  welcomePage: WelcomePageConfig;
  customData?: Record<string, any>;
}

export type ClientId = 'client-a' | 'client-b' | 'client-c' | 'default';

export interface WelcomeModuleError {
  moduleId: string;
  moduleTitle: string;
  field: string;
  message: string;
}
