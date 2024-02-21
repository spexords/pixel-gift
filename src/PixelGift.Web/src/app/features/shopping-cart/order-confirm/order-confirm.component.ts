import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, first } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrderSucceededComponent } from './order-succeeded/order-succeeded.component';
import { OrderFailedComponent } from './order-failed/order-failed.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [CommonModule, OrderSucceededComponent, OrderFailedComponent],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private breadcrumbService = inject(BreadcrumbService);
  private translocoService = inject(TranslocoService);
  private shoppingCartService = inject(ShoppingCartService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private paymentStatus!: string;

  orderCustomerId!: string;

  ngOnInit(): void {
    this.getDataFromQueryString();
    this.updateBreadcrumb();
    this.cleanUpShoppingCart();
  }

  get paymentSucceeded(): boolean {
    return this.paymentStatus === 'succeeded';
  }

  cleanUpShoppingCart(): void {
    if (this.paymentSucceeded) {
      this.shoppingCartService.clearBasket();
    }
  }

  continueShopping(): void {
    this.router.navigate(['/']);
  }

  tryAgain(): void {
    this.router.navigate(['/', 'shopping-cart']);
  }

  private getDataFromQueryString() {
    this.route.queryParams.pipe(first()).subscribe((params) => {
      this.paymentStatus = params['redirect_status'] as string;
      this.orderCustomerId = params['orderCustomerId'] as string;
      this.translocoService.setActiveLang(params['lang'] as string);
    });
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
