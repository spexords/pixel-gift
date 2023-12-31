import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { ItemCardComponent } from 'src/app/features/home/gift-store/store-items/item-card/item-card.component';
import { LangSwitcherComponent } from './lang-switcher/lang-switcher.component';
import { NavbarService } from './navbar.service';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    ItemCardComponent,
    LangSwitcherComponent,
    TranslocoPipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  isScrollAtTop = true;
  navbarService = inject(NavbarService);

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrollAtTop = window.scrollY < 50;
  }
}
