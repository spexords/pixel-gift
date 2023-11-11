import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCategoriesComponent } from './store-categories/store-categories.component';

@Component({
  selector: 'app-gift-store',
  standalone: true,
  imports: [CommonModule, StoreCategoriesComponent],
  templateUrl: './gift-store.component.html',
  styleUrl: './gift-store.component.scss',
})
export class GiftStoreComponent {}
