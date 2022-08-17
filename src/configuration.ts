import { InjectionToken } from '@angular/core';

export interface AppConfiguration {
  production: boolean;
  HanttechAPI: string;
  ElasticsearchAPI: string;
}

export const AppConfig = new InjectionToken<AppConfiguration>(
  '@@appConfiguration'
);
