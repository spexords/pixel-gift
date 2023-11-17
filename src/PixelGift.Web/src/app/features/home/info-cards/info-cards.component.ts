import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from './info-card/info-card.component';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-info-cards',
  standalone: true,
  imports: [CommonModule, InfoCardComponent, TranslocoPipe],
  templateUrl: './info-cards.component.html',
  styleUrl: './info-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoCardsComponent {}
