import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqAccordionComponent } from './faq-accordion/faq-accordion.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FaqAccordionComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {}
