import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { enumToSelectOptions } from 'src/app/shared/utils';
import { StatusComponent } from 'src/app/shared/components/status/status.component';
import { MatDialog } from '@angular/material/dialog';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { Status } from 'src/app/shared/components/status/status.type';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { AdminActions, AdminSelectors } from '../../state';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { isEqual } from 'lodash';
import { OrderSearchParams, OrderStatus } from '../../models';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StatusComponent, LetDirective],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
  private dialog = inject(MatDialog);
  private store = inject(Store);

  orderStatuses = [
    { value: '', displayValue: 'All' },
    ...enumToSelectOptions(OrderStatus),
  ];

  form = new FormGroup({
    customerOrderId: new FormControl<number | null>(null),
    status: new FormControl<string | null>(''),
  });

  orders$ = this.store.select(AdminSelectors.selectOrders);

  ngOnInit(): void {
    this.store.dispatch(AdminActions.getOrders());
    this.initFormBehaviour();
  }

  getCorrectStatus(orderStatus: string): Status {
    switch (orderStatus) {
      case OrderStatus[OrderStatus.PaymentFailed]:
        return 'critical';
      case OrderStatus[OrderStatus.PaymentReceived]:
        return 'success';
      case OrderStatus[OrderStatus.InProgress]:
        return 'info';
      case OrderStatus[OrderStatus.Finished]:
        return 'warning';
      default:
        return 'default';
    }
  }

  manageOrder(id: string): void {
    this.dialog.open(ManageOrderComponent, { data: id });
  }

  initFormBehaviour() {
    this.form.valueChanges
      .pipe(distinctUntilChanged(isEqual), debounceTime(300))
      .subscribe((values) => {
        this.store.dispatch(
          AdminActions.setSearchParams({
            searchParams: values as OrderSearchParams,
          }),
        );
      });
  }
}
