import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isScrollAtTop = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrollAtTop = window.scrollY < 50;
    console.log(this.isScrollAtTop)
  }
}
