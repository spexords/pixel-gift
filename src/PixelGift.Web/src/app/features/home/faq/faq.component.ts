import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqAccordionComponent } from './faq-accordion/faq-accordion.component';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FaqAccordionComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  translocoService = inject(TranslocoService);
  faqItems$ = this.translocoService.selectTranslate('faq');

  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  scrollIntoView() {
    this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
