import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { CategoriesCardsComponent } from './categories-cards/categories-cards.component';
import { ChooseUsComponent } from './choose-us/choose-us.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { GiftStoreComponent } from './gift-store/gift-store.component';
import { CustomerFeedbacksComponent } from './customer-feedbacks/customer-feedbacks.component';
import { FaqComponent } from './faq/faq.component';
import { NavbarService } from 'src/app/core/navbar/navbar.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    JumbotronComponent,
    CategoriesCardsComponent,
    ChooseUsComponent,
    InfoCardsComponent,
    GiftStoreComponent,
    CustomerFeedbacksComponent,
    FaqComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private navbarService = inject(NavbarService);

  @ViewChild('store') giftStore!: GiftStoreComponent;
  @ViewChild('faq') faq!: FaqComponent;
  @ViewChild('chooseUs') chooseUs!: ChooseUsComponent;

  ngOnInit(): void {
    this.navbarService.scrollToSection
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((section) => {
        if (section === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (section === 'store') {
          this.giftStore.scrollIntoView();
        } else if (section === 'faq') {
          this.faq.scrollIntoView();
        } else if (section === 'choose-us') {
          this.chooseUs.scrollIntoView();
        }
      });
  }
}
