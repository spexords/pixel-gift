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
import { combineLatest } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private breadcrumbService = inject(BreadcrumbService);
  private translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.updateBreadcrumb();
  }

  private updateBreadcrumb(): void {
    combineLatest([
      this.translocoService.selectTranslate('shopping-cart.bc1'),
      this.translocoService.selectTranslate('shopping-cart.bc2'),
      this.translocoService.selectTranslate('shopping-cart.bc3'),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([bc1, bc2, bc3]) => {
        this.breadcrumbService.set('@shopping-cart', bc1);
        this.breadcrumbService.set('@checkout', bc2);
        this.breadcrumbService.set('@confirm', bc3);
      });
  }
}
