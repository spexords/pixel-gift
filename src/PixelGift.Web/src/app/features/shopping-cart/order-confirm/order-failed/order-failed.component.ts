import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-failed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-failed.component.html',
  styleUrl: './order-failed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFailedComponent {
  @Output() tryAgainClicked = new EventEmitter();
}
