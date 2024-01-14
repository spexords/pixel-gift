import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-product-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-product-header.component.html',
  styleUrl: './order-product-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderProductHeaderComponent {}
