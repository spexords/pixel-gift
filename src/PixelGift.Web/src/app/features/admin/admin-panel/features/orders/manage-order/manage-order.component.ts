import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { enumToSelectOptions } from 'src/app/shared/utils';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { filter, tap } from 'rxjs';
import { BreakLinesPipe } from 'src/app/shared/pipes/break-lines.pipe';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { AdminActions, AdminSelectors } from '../../../state';
import { isNull } from 'lodash';
import {
  DetailedOrderAdmin,
  MailMessageRequest,
  OrderStatus,
} from '../../../models';

@Component({
  selector: 'app-manage-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BreakLinesPipe,
    LetDirective,
  ],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageOrderComponent implements OnInit {
  private store = inject(Store);

  statuses = enumToSelectOptions(OrderStatus);
  status = new FormControl<string>('');

  mailForm = new FormGroup({
    orderId: new FormControl(),
    subject: new FormControl<string>('', Validators.required),
    content: new FormControl<string>('', Validators.required),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public id: string) {}

  ngOnInit(): void {
    this.store.dispatch(AdminActions.getOrder({ id: this.id }));
  }

  order$ = this.store.select(AdminSelectors.selectOrder).pipe(
    filter((order) => !isNull(order)),
    tap((order) => {
      this.updateMissingDetails(order!);
      this.updateOrderMessage(order!);
    }),
  );

  updateOrder(id: string): void {
    this.store.dispatch(
      AdminActions.updateOrder({
        id,
        status: this.status.value as string,
      }),
    );
  }

  sendMail(event: Event): void {
    event.preventDefault();
    this.store.dispatch(
      AdminActions.sendOrderMessage({
        message: this.mailForm.value as MailMessageRequest,
      }),
    );
  }

  private updateMissingDetails(order: DetailedOrderAdmin) {
    this.status.patchValue(order.status);
  }

  private updateOrderMessage(order: DetailedOrderAdmin): void {
    this.mailForm.controls.orderId.patchValue(order.id);
    this.mailForm.controls.subject.patchValue(
      `Products details & confirmation - Order #${order.customerOrderId}  `,
    );
  }
}
