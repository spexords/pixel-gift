import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableCardComponent } from 'src/app/shared/components/editable-card/editable-card.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { Category } from 'src/app/core/models';
import { AdminPanelService } from '../../admin-panel.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, EditableCardComponent, ConfirmationModalComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  private adminPanelService = inject(AdminPanelService);
  private dialog = inject(MatDialog);
  menuItems = ['Update', 'Delete'];

  categories$ = this.adminPanelService.categories$;

  handleMenuItemClicked(menuItem: string, category: Category): void {
    switch (menuItem) {
      case 'Update':
        this.handleUpdate();
        break;
      case 'Delete':
        this.handleDelete(category);
        break;
    }
  }

  handleUpdate(): void {
    const dialogRef = this.dialog.open(UpdateCategoryComponent);
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
}
