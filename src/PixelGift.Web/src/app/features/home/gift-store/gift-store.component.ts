import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCategoriesComponent } from './store-categories/store-categories.component';
import { StoreItemsComponent } from './store-items/store-items.component';
import { TranslocoPipe } from '@ngneat/transloco';
import { GiftStoreService } from './gift-store.service';

@Component({
  selector: 'app-gift-store',
  standalone: true,
  imports: [CommonModule, StoreCategoriesComponent, StoreItemsComponent, TranslocoPipe],
  templateUrl: './gift-store.component.html',
  styleUrl: './gift-store.component.scss',
})
export class GiftStoreComponent {
  private giftStoreService = inject(GiftStoreService);

  categories$ = this.giftStoreService.getCategories();

  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  scrollIntoView() {
    this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
