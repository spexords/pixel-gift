import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService as AdminPanelService } from '../../admin-panel.service';
import { EditableCardComponent } from 'src/app/shared/components/editable-card/editable-card.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { UpdateCategoryComponent } from './update-category/update-category.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, EditableCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  private adminPanelService = inject(AdminPanelService);
  private dialog = inject(MatDialog);
  menuItems = ['Update', 'Delete'];

  categories$ = this.adminPanelService.getCategories();

  handleMenuItemClicked(menuItem: string): void {
    console.log('lul')
    switch (menuItem) {
      case 'Update':
        this.handleUpdate();
        break;
      case 'Delete':
        this.handleDelete();
        break;
    }
  }

  handleUpdate(): void {
    const dialogRef = this.dialog.open(UpdateCategoryComponent);
  }

  handleDelete(): void {
    console.log('delete');
  }
}
