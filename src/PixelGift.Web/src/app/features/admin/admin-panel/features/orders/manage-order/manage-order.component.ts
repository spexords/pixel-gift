import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminPanelService } from '../../../admin-panel.service';
import { enumToSelectOptions } from 'src/app/shared/utils';
import {
  DetailedOrderAdmin,
  MailMessageRequest,
  OrderStatus,
} from 'src/app/core/models';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subject, switchMap, tap } from 'rxjs';
import { BreakLinesPipe } from 'src/app/shared/pipes/break-lines.pipe';
import { LetDirective } from '@ngrx/component';

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
export class ManageOrderComponent {
  private dialogRef = inject(MatDialogRef<ManageOrderComponent>);
  private adminPanelService = inject(AdminPanelService);
  private refreshOrder = new BehaviorSubject<undefined>(undefined);

  statuses = enumToSelectOptions(OrderStatus);
  status = new FormControl<string>('');

  mailForm = new FormGroup({
    orderId: new FormControl(),
    subject: new FormControl<string>('', Validators.required),
    content: new FormControl<string>('', Validators.required),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public id: string) {}

  order$ = this.refreshOrder.asObservable().pipe(
    switchMap(() =>
      this.adminPanelService.getOrder(this.id).pipe(
        tap((order) => {
          this.updateMissingDetails(order);
          this.initDefaultSubject(order.customerOrderId);
        })
      )
    )
  );

  updateOrder(id: string): void {
    this.adminPanelService
      .updateOrder(id, this.status.value as string)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  sendMail(event: Event): void {
    event.preventDefault();
    this.adminPanelService
      .sendOrderMessage(this.id, this.mailForm.value as MailMessageRequest)
      .subscribe({
        next: () => {
          alert('Email sent');
          this.refreshOrder.next(undefined);
          this.mailForm.controls.content.patchValue('');
        },
        error: () => alert('Could not send email'),
      });
  }

  private updateMissingDetails(order: DetailedOrderAdmin) {
    this.status.patchValue(order.status);
  }

  private initDefaultSubject(customerOrderId: number): void {
    this.mailForm.controls.subject.patchValue(
      `Products details & confirmation - Order #${customerOrderId}  `
    );
  }
}
