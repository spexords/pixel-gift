import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageCategoryFormComponent } from '../manage-category-form/manage-category-form.component';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../../state';
import { CategoryPayloadRequest } from '../../../models';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule, ManageCategoryFormComponent],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCategoryComponent {
  private store = inject(Store);

  onSubmit(category: CategoryPayloadRequest): void {
    category.id = uuidv4();
    this.store.dispatch(AdminActions.createCategory({ category }));
  }
}
