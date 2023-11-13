import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactLinkComponent } from './contact-link/contact-link.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ContactLinkComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
