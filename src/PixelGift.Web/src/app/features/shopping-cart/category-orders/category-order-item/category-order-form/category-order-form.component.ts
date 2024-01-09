import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-order-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-order-form.component.html',
  styleUrl: './category-order-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryOrderFormComponent {}
