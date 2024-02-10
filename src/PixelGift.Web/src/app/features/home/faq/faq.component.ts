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
import { Scrollable } from 'src/app/core/models';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FaqAccordionComponent, LetDirective],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent implements Scrollable {
  translocoService = inject(TranslocoService);
  faqItems$ = this.translocoService.selectTranslate('faq');

  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  scrollIntoView() {
    const element = this.scrollTarget.nativeElement.offsetTop;
    window.scroll({
      top: element,
      behavior: 'smooth',
    });
  }
}
