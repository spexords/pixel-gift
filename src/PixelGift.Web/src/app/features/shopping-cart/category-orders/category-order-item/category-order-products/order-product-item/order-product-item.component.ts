import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterButtonComponent } from 'src/app/shared/components/counter-button/counter-button.component';

@Component({
  selector: 'app-order-product-item',
  standalone: true,
  imports: [CommonModule, CounterButtonComponent],
  templateUrl: './order-product-item.component.html',
  styleUrl: './order-product-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderProductItemComponent {}
