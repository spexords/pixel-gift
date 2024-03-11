import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { loadingInterceptor, baseUrlInterceptor } from './core/interceptors';
import { appStore, appEffects } from './core/store/app.store';
import { provideTokens } from './core/tokens';
import { authInterceptor } from './features/admin/auth/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { provideRouter, withRouterConfig } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { provideLang } from './core/lang/lang.provider';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterSerializer } from './core/router';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      NgxSpinnerModule,
      BreadcrumbModule,
      StoreModule.forRoot(appStore),
      EffectsModule.forRoot(appEffects),
      StoreRouterConnectingModule.forRoot({
        serializer: RouterSerializer,
      }),
      StoreDevtoolsModule.instrument(),
    ),
    provideTokens(),
    provideAnimations(),
    provideRouter(
      APP_ROUTES,
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
    provideHttpClient(
      withInterceptors([
        loadingInterceptor,
        baseUrlInterceptor,
        authInterceptor,
      ]),
    ),
    provideLang(),
  ],
};
