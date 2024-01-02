import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminPanelService } from '../../../admin-panel.service';
import { CategoryPayloadRequest } from 'src/app/core/models';
import { ManageCategoryFormComponent } from '../manage-category-form/manage-category-form.component';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule, ManageCategoryFormComponent],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCategoryComponent {
  private dialogRef = inject(MatDialogRef<CreateCategoryComponent>);
  private adminPanelService = inject(AdminPanelService);

  onSubmit(data: CategoryPayloadRequest): void {
    this.adminPanelService.createCategory(data).subscribe({
      next: () => {
        alert('Category successfully created');
        this.dialogRef.close();
      },
      error: (e) => alert(e.error.errors.message),
    });
  }
}
