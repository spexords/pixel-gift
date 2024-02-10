import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminPanelService } from '../../../admin-panel.service';
import { ManagePromoCodeFormComponent } from '../manage-promo-code-form/manage-promo-code-form.component';
import { PromoCodePayloadRequest } from 'src/app/core/models';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'app-update-promo-code',
  standalone: true,
  imports: [CommonModule, ManagePromoCodeFormComponent, LetDirective],
  templateUrl: './update-promo-code.component.html',
  styleUrl: './update-promo-code.component.scss',
})
export class UpdatePromoCodeComponent {
  private dialogRef = inject(MatDialogRef<UpdatePromoCodeComponent>);
  private adminPanelService = inject(AdminPanelService);

  constructor(@Inject(MAT_DIALOG_DATA) public id: string) {}

  promoCode$ = this.adminPanelService.getPromoCode(this.id);

  onSubmit(data: PromoCodePayloadRequest): void {
    this.adminPanelService.updatePromoCode(this.id, data).subscribe({
      next: () => {
        alert('Promo code successfully updated');
        this.dialogRef.close();
      },
      error: (e) => alert(e.error.errors.message),
    });
  }
}
