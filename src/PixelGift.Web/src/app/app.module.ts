import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { FooterComponent } from './core/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { authInterceptor } from './features/admin/auth/auth.interceptor';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NgxSpinnerModule } from 'ngx-spinner';
import { API_URL, DISCORD_INVITE_URL } from './core/tokens';
import { baseUrlInterceptor, loadingInterceptor } from './core/interceptors';
import { NavbarComponent } from './core/navigation/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslocoRootModule,
    NavbarComponent,
    HomeComponent,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FooterComponent,
    BreadcrumbModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: API_URL, useValue: environment.apiUrl },
    {
      provide: DISCORD_INVITE_URL,
      useValue: environment.discordInviteUrl,
    },
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        loadingInterceptor,
        baseUrlInterceptor,
      ])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
