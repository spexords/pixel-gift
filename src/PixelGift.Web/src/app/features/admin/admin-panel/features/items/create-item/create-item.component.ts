import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminPanelService } from '../../../admin-panel.service';
import { ItemPayloadRequest } from 'src/app/core/models';
import { ManageItemFormComponent } from '../manage-item-form/manage-item-form.component';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [CommonModule, ManageItemFormComponent],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateItemComponent {
  private dialogRef = inject(MatDialogRef<CreateItemComponent>);
  private adminPanelService = inject(AdminPanelService);

  onSubmit(data: ItemPayloadRequest): void {
    this.adminPanelService.createItem(data).subscribe({
      next: () => {
        alert('Item successfully created');
        this.dialogRef.close();
      },
      error: (e) => alert(e.error.errors.message),
    });
  }
}
