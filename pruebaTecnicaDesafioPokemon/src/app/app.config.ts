import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config'

import { routes } from './app.routes';
import AuraBlue from './themes/aura-blue.preset';

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
    })
  ]
};
