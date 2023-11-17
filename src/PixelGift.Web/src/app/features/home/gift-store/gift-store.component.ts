import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCategoriesComponent } from './store-categories/store-categories.component';
import { StoreItemsComponent } from './store-items/store-items.component';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-gift-store',
  standalone: true,
  imports: [CommonModule, StoreCategoriesComponent, StoreItemsComponent, TranslocoPipe],
  templateUrl: './gift-store.component.html',
  styleUrl: './gift-store.component.scss',
})
export class GiftStoreComponent {
  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  scrollIntoView() {
    this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
