import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSummary } from 'src/app/core/models';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSummaryComponent {
  @Input({ required: true }) orderSummary!: OrderSummary;
  @Input() checkout = false;
  @Output() clicked = new EventEmitter();
}
