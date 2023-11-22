import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCategoryComponent } from './store-category/store-category.component';
import { Category } from 'src/app/core/models';

@Component({
  selector: 'app-store-categories',
  standalone: true,
  imports: [CommonModule, StoreCategoryComponent],
  templateUrl: './store-categories.component.html',
  styleUrl: './store-categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCategoriesComponent {
  @Input({ required: true }) categories!: Category[];
  @Input({ required: true }) currentCategory!: Category;
  @Output() categorySelected = new EventEmitter<Category>();
}
