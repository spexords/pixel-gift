import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCardComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) price!: number;
  @Input({ required: true }) item!: string;
}
