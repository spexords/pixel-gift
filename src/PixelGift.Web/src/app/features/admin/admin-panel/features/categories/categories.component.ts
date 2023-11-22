import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../admin.service';
import { EditableCardComponent } from 'src/app/shared/components/editable-card/editable-card.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, EditableCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  private adminService = inject(AdminService);
  menuItems = ['Update', 'Delete'];

  categories$ = this.adminService.getCategories();

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
    console.log('update');
  }

  handleDelete(): void {
    console.log('delete');
  }
}
