import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { Item } from '../../../models';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCardComponent {
  @Input({ required: true }) item!: Item;
  @Output() addPressed = new EventEmitter<string>();
}
