import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private scrollToSectionSource = new Subject<string>();
  scrollToSection$ = this.scrollToSectionSource.asObservable();

  scroll(section: string): void {
    this.scrollToSectionSource.next(section);
  }
}
