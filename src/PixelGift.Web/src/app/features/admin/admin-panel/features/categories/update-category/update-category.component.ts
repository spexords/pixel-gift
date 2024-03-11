import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageCategoryFormComponent } from '../manage-category-form/manage-category-form.component';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { AdminActions, AdminSelectors } from '../../../state';
import { CategoryPayloadRequest } from '../../../models';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule, ManageCategoryFormComponent, LetDirective],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateCategoryComponent implements OnInit {
  private store = inject(Store);

  constructor(@Inject(MAT_DIALOG_DATA) public id: string) {}

  ngOnInit(): void {
    this.store.dispatch(AdminActions.getCategory({ id: this.id }));
  }

  category$ = this.store.select(AdminSelectors.selectCategory);

  onSubmit(category: CategoryPayloadRequest): void {
    this.store.dispatch(AdminActions.updateCategory({ category }));
  }
}
