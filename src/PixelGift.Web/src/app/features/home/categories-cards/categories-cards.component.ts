import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './category-card/category-card.component';

@Component({
  selector: 'app-categories-cards',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent],
  templateUrl: './categories-cards.component.html',
  styleUrl: './categories-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesCardsComponent {}
