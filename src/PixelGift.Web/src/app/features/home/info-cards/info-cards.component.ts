import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from './info-card/info-card.component';

@Component({
  selector: 'app-info-cards',
  standalone: true,
  imports: [CommonModule, InfoCardComponent],
  templateUrl: './info-cards.component.html',
  styleUrl: './info-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoCardsComponent {}
