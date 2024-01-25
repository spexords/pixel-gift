import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { enumToSelectOptions } from 'src/app/shared/utils';
import { OrderSearchParams, OrderStatus } from 'src/app/core/models';
import { AdminPanelService } from '../../admin-panel.service';
import { StatusComponent } from 'src/app/shared/components/status/status.component';
import { Status } from 'src/app/shared/components/status/status.enum';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StatusComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
  private adminService = inject(AdminPanelService);
  orderStatuses = [
    { value: '', displayValue: 'All' },
    ...enumToSelectOptions(OrderStatus),
  ];

  form = new FormGroup({
    customerOrderId: new FormControl<number | null>(null),
    status: new FormControl<string | null>(''),
  });

  orders$ = this.adminService.orders$;

  ngOnInit(): void {
    this.initFormBehaviour();
  }

  getCorrectStatus(orderStatus: string): Status {
    switch (orderStatus) {
      case OrderStatus[OrderStatus.New]:
        return Status.Warning;
      case OrderStatus[OrderStatus.PaymentFailed]:
        return Status.Critical;
      case OrderStatus[OrderStatus.PaymentReceived]:
        return Status.Success;
      case OrderStatus[OrderStatus.InProgress]:
        return Status.Info;
      case OrderStatus[OrderStatus.Finished]:
        return Status.Default;
      default:
        return Status.Default;
    }
  }

  initFormBehaviour() {
    this.form.valueChanges.subscribe((values) => {
      this.adminService.notifyOrdersSearchParamsChanged(
        values as OrderSearchParams
      );
    });
  }
}
