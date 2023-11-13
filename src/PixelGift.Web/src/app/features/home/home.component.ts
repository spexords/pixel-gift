import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { CategoriesCardsComponent } from './categories-cards/categories-cards.component';
import { ChooseUsComponent } from './choose-us/choose-us.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { GiftStoreComponent } from './gift-store/gift-store.component';
import { CustomerFeedbacksComponent } from './customer-feedbacks/customer-feedbacks.component';
import { FaqComponent } from './faq/faq.component';

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
    FaqComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
