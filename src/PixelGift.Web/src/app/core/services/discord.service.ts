import { Injectable, inject } from '@angular/core';
import { DISCORD_INVITE_URL } from '../tokens/discord-invite-url.token';

@Injectable({
  providedIn: 'root',
})
export class DiscordService {
  private discordInviteUrl = inject<string>(DISCORD_INVITE_URL);

  getDiscordInviteUrl(): string {
    return this.discordInviteUrl;
  }

  redirectToDiscord(): void {
    window.location.href = this.discordInviteUrl;
  }
}
