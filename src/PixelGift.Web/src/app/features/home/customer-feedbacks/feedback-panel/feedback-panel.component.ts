import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-feedback-panel',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './feedback-panel.component.html',
  styleUrl: './feedback-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackPanelComponent {}
