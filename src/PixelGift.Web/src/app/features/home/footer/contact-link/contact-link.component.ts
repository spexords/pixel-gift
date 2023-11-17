import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-link.component.html',
  styleUrl: './contact-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactLinkComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) size!: number;
  @Input() link?: string;
}
