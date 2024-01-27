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
import { OrderStatus } from 'src/app/core/models';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-manage-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageOrderComponent {
  private dialogRef = inject(MatDialogRef<ManageOrderComponent>);
  private adminPanelService = inject(AdminPanelService);

  statuses = enumToSelectOptions(OrderStatus);
  status = new FormControl<string>('');

  mailForm = new FormGroup({
    subject: new FormControl<string>('', Validators.required),
    message: new FormControl<string>('', Validators.required),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public id: string) {}

  order$ = this.adminPanelService.getOrder(this.id).pipe(
    tap((order) => {
      this.status.patchValue(order.status);
    })
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
    console.log(this.mailForm.value)
  }

}
