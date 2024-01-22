import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-order-product-header',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './order-product-header.component.html',
  styleUrl: './order-product-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderProductHeaderComponent {
  private translocoService = inject(TranslocoService);
  header$ = this.translocoService.selectTranslate('shopping-cart.products-header');
}
