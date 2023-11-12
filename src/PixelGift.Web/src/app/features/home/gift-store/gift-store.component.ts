import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCategoriesComponent } from './store-categories/store-categories.component';
import { StoreItemsComponent } from './store-items/store-items.component';

@Component({
  selector: 'app-gift-store',
  standalone: true,
  imports: [CommonModule, StoreCategoriesComponent, StoreItemsComponent],
  templateUrl: './gift-store.component.html',
  styleUrl: './gift-store.component.scss',
})
export class GiftStoreComponent {}
