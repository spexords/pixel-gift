import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactLinkComponent } from './contact-link/contact-link.component';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ContactLinkComponent, TranslocoPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
