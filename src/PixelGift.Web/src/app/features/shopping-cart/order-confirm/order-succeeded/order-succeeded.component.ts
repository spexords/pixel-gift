import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-order-succeeded',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './order-succeeded.component.html',
  styleUrl: './order-succeeded.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSucceededComponent {
  @Input({ required: true }) orderCustomerId: string | undefined = undefined;
  @Output() continueShoppingClicked = new EventEmitter();
}
