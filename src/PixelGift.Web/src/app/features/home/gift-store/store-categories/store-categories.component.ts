import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCategoryComponent } from './store-category/store-category.component';

@Component({
  selector: 'app-store-categories',
  standalone: true,
  imports: [CommonModule, StoreCategoryComponent],
  templateUrl: './store-categories.component.html',
  styleUrl: './store-categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCategoriesComponent {}