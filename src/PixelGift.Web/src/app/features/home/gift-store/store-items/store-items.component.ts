import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from './item-card/item-card.component';

@Component({
  selector: 'app-store-items',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: './store-items.component.html',
  styleUrl: './store-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreItemsComponent {}
