import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { loadingInterceptor, baseUrlInterceptor } from './core/interceptors';
import { appStore, appEffects } from './core/store/store';
import { provideTokens } from './core/tokens';
import { authInterceptor } from './features/admin/auth/auth.interceptor';
import { provideTransloco } from '@ngneat/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BreadcrumbModule } from 'xng-breadcrumb';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
  withRouterConfig,
} from '@angular/router';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(NgxSpinnerModule, BreadcrumbModule),
    provideTokens(),
    provideAnimations(),
    provideRouter(
      APP_ROUTES,
      withPreloading(PreloadAllModules),
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        loadingInterceptor,
        baseUrlInterceptor,
      ])
    ),
    provideStore(appStore),
    provideEffects(appEffects),
    provideStoreDevtools(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'pl'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
