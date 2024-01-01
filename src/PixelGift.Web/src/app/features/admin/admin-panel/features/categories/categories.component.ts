import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableCardComponent } from 'src/app/shared/components/editable-card/editable-card.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { Category } from 'src/app/core/models';
import { AdminPanelService } from '../../admin-panel.service';
import { CreateCategoryComponent } from './create-category/create-category.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    EditableCardComponent,
    ConfirmationModalComponent,
    CreateCategoryComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  private adminPanelService = inject(AdminPanelService);
  private dialog = inject(MatDialog);

  existingCategoryMenuItems = ['Update', 'Delete'];

  categories$ = this.adminPanelService.categories$;

  handleExistingCategoryClicked(menuItem: string, category: Category): void {
    switch (menuItem) {
      case 'Update':
        this.handleUpdate(category.id);
        break;
      case 'Delete':
        this.handleDelete(category);
        break;
    }
  }

  handleUpdate(id: string): void {
    this.dialog.open(UpdateCategoryComponent, { data: id });
  }

  handleDelete(category: Category): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: `Are you sure you want to remove ${category.name}?`,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminPanelService.deleteCategory(category.id).subscribe();
      }
    });
  }

  handleNewCategory(): void {
    this.dialog.open(CreateCategoryComponent);
  }
}
