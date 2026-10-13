import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config'

import { routes } from './app.routes';
import AuraBlue from './themes/aura-blue.preset';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: AuraBlue,
        options: {
          darkModeSelector: false
        }
      }
    }),
    provideHttpClient()
  ]
};
