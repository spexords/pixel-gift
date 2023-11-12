import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackPanelComponent } from './feedback-panel/feedback-panel.component';
import { ReviewBoxComponent } from './review-box/review-box.component';

@Component({
  selector: 'app-customer-feedbacks',
  standalone: true,
  imports: [CommonModule, FeedbackPanelComponent, ReviewBoxComponent],
  templateUrl: './customer-feedbacks.component.html',
  styleUrl: './customer-feedbacks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFeedbacksComponent {}
