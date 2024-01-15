import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@ngneat/transloco';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-checkout.component.html',
  styleUrl: './order-checkout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCheckoutComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private breadcrumbService = inject(BreadcrumbService);
  private translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.translocoService
      .selectTranslate('shopping-cart.bc2')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.breadcrumbService.set('@checkout', value));
  }
}
