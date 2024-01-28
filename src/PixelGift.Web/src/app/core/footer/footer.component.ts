import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactLinkComponent } from './contact-link/contact-link.component';
import { TranslocoPipe } from '@ngneat/transloco';
import { DiscordService } from '../services/discord.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ContactLinkComponent, TranslocoPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private discordService = inject(DiscordService);
  discordInviteUrl = this.discordService.getDiscordInviteUrl();

  redirectToDiscord(): void {
    this.discordService.redirectToDiscord();
  }
}
