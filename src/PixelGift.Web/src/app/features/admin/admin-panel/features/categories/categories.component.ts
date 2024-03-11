import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableCardComponent } from 'src/app/shared/components/editable-card/editable-card.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { AdminActions, AdminSelectors } from '../../state';
import { Category } from 'src/app/features/home/models';
import { CreateCategoryComponent } from './create-category/create-category.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    EditableCardComponent,
    ConfirmationModalComponent,
    CreateCategoryComponent,
    LetDirective,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(MatDialog);

  existingCategoryMenuItems = ['Update', 'Delete'];

  categories$ = this.store.select(AdminSelectors.selectCategories);

  ngOnInit(): void {
    this.store.dispatch(AdminActions.getCategories());
  }

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
        this.store.dispatch(AdminActions.deleteCategory({ id: category.id }));
      }
    });
  }

  handleNewCategory(): void {
    this.dialog.open(CreateCategoryComponent);
  }
}
