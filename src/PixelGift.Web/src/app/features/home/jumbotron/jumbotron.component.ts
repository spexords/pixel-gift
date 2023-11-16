import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JumbotronComponent {
  private translocoService = inject(TranslocoService);

  changeLanguage(): void {
    const lang = this.translocoService.getActiveLang();
    if (lang === 'en') this.translocoService.setActiveLang('pl');
    else this.translocoService.setActiveLang('en');
  }
}
