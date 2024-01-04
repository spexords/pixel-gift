import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminPanelService } from '../../../admin-panel.service';
import { CreateCategoryComponent } from '../../categories/create-category/create-category.component';
import { ItemPayloadRequest } from 'src/app/core/models';
import { ManageItemFormComponent } from '../manage-item-form/manage-item-form.component';

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [CommonModule, ManageItemFormComponent],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.scss',
})
export class UpdateItemComponent {
  private dialogRef = inject(MatDialogRef<CreateCategoryComponent>);
  private adminPanelService = inject(AdminPanelService);

  constructor(@Inject(MAT_DIALOG_DATA) public id: string) {}

  item$ = this.adminPanelService.getItem(this.id);

  onSubmit(data: ItemPayloadRequest): void {
    this.adminPanelService.updateItem(this.id, data).subscribe({
      next: () => {
        alert('Item successfully updated');
        this.dialogRef.close();
      },
      error: (e) => alert(e.error.errors.message),
    });
  }
}