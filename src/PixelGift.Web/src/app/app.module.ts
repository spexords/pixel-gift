import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { API_URL } from './core/tokens/api-url.token';
import { environment } from 'src/environments/environment';
import { authInterceptor } from './features/admin/auth/auth.interceptor';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { DISCORD_INVITE_URL } from './core/tokens/discord-invite-url.token';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslocoRootModule,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    BreadcrumbModule,
  ],
  providers: [
    { provide: API_URL, useValue: environment.apiUrl },
    {
      provide: DISCORD_INVITE_URL,
      useValue: 'https://discord.com/invite/pixelgift',
    },
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
