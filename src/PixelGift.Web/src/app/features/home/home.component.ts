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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FooterComponent } from 'src/app/core/footer/footer.component';
import { NavbarComponent } from 'src/app/core/navigation/navbar/navbar.component';
import { NavbarService } from 'src/app/core/navigation/navbar/navbar.service';
import { Scrollable } from 'src/app/core/models';
import { Store } from '@ngrx/store';
import { HomeActions, HomeSelectors } from './state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
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
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private navbarService = inject(NavbarService);

  @ViewChild('store') giftStore!: Scrollable;
  @ViewChild('faq') faq!: Scrollable;
  @ViewChild('chooseUs') chooseUs!: Scrollable;

  ngOnInit(): void {
    this.handleScrollNavigation();
    this.store.dispatch(HomeActions.getCategoriesList());
  }

  handleScrollNavigation() {
    this.navbarService.scrollToSection$
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
