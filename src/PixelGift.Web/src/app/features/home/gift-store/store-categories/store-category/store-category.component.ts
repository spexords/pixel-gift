import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-store-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store-category.component.html',
  styleUrl: './store-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreCategoryComponent {
  @HostBinding('class.active') activeClass = false;

  @Input() set active(value: boolean) {
    this.activeClass = value;
  }
}
