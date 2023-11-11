import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoCardComponent {
  @HostBinding('style.background-image') back!: any;
  @HostBinding('style.margin-top') mt!: any;
  @Input() even = false;
  @Input({ required: true }) background!: string;
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) description!: string;

  ngOnInit(): void {
    this.back = `url('${this.background}')`;
    if (this.even) {
      this.mt = '45px';
    }
  }
}
