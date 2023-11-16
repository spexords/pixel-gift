import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { ItemCardComponent } from 'src/app/features/home/gift-store/store-items/item-card/item-card.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  isScrollAtTop = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrollAtTop = window.scrollY < 50;
    console.log(this.isScrollAtTop);
  }
}
