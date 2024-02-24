import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { environment } from 'src/environments/environment';
import { API_URL } from './api-url.token';
import { DISCORD_INVITE_URL } from './discord-invite-url.token';

export * from './api-url.token';
export * from './discord-invite-url.token';

export function provideTokens(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: API_URL, useValue: environment.apiUrl },
    {
      provide: DISCORD_INVITE_URL,
      useValue: environment.discordInviteUrl,
    },
  ]);
}
