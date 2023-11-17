import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent implements OnInit {
  @HostBinding('style.background-image') back!: any;
  @HostBinding('style.margin-top') mt!: any;
  @Input() even = false;
  @Input({ required: true }) background!: string;
  @Input({ required: true }) logo!: string;

  ngOnInit(): void {
    this.back = `url('${this.background}')`;
    if (this.even) {
      this.mt = '35px';
    }
  }
}
