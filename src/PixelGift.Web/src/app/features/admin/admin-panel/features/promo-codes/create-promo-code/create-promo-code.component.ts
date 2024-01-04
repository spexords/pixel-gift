import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { PromoCodePayload } from 'src/app/core/models';
import { AdminPanelService } from '../../../admin-panel.service';
import { ManagePromoCodeFormComponent } from '../manage-promo-code-form/manage-promo-code-form.component';

@Component({
  selector: 'app-create-promo-code',
  standalone: true,
  imports: [CommonModule, ManagePromoCodeFormComponent],
  templateUrl: './create-promo-code.component.html',
  styleUrl: './create-promo-code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePromoCodeComponent {
  private dialogRef = inject(MatDialogRef<CreatePromoCodeComponent>);
  private adminPanelService = inject(AdminPanelService);

  onSubmit(data: PromoCodePayload): void {
    this.adminPanelService.createPromoCode(data).subscribe({
      next: () => {
        alert('Promo Code successfully created');
        this.dialogRef.close();
      },
      error: (e) => alert(e.error.errors.message),
    });
  }
}
