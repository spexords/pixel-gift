import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@ngneat/transloco';
import { Flag, flags } from './flags.const';

@Component({
  selector: 'app-lang-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lang-switcher.component.html',
  styleUrl: './lang-switcher.component.scss',
})
export class LangSwitcherComponent implements OnInit {
  private transolocoService = inject(TranslocoService);
  private el = inject(ElementRef);

  opened = false;
  flags = flags;
  flag!: Flag;

  ngOnInit(): void {
    this.setLang();
  }

  setLang() {
    const activeLang = this.transolocoService.getActiveLang();
    const destinationLang = window.localStorage.getItem('lang');
    if (destinationLang && destinationLang !== activeLang) {
      this.transolocoService.setActiveLang(destinationLang);
    }
    this.flag = flags[this.transolocoService.getActiveLang()];
  }

  toggleLangSwitcher(): void {
    this.opened = !this.opened;
  }

  switchLang(lang: string) {
    const activeLang = this.transolocoService.getActiveLang();
    if (lang !== activeLang) {
      this.transolocoService.setActiveLang(lang);
      this.flag = flags[lang];
      window.localStorage.setItem('lang', lang);
    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.opened = false;
    }
  }
}
