import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminPanelService } from '../../../admin-panel.service';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { CategoryPayloadRequest } from 'src/app/core/models';
import { ManageCategoryFormComponent } from '../manage-category-form/manage-category-form.component';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule, ManageCategoryFormComponent, LetDirective],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateCategoryComponent {
  private dialogRef = inject(MatDialogRef<CreateCategoryComponent>);
  private adminPanelService = inject(AdminPanelService);

  constructor(@Inject(MAT_DIALOG_DATA) public id: string) {}

  category$ = this.adminPanelService.getCategory(this.id);

  onSubmit(data: CategoryPayloadRequest): void {
    this.adminPanelService.updateCategory(this.id, data).subscribe({
      next: () => {
        alert('Category successfully updated');
        this.dialogRef.close();
      },
      error: (e) => alert(e.error.errors.message),
    });
  }
}
