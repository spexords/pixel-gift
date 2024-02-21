import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule, BreadcrumbService } from 'xng-breadcrumb';
import { LangSwitcherComponent } from 'src/app/shared/components/lang-switcher/lang-switcher.component';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, LangSwitcherComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  bcService = inject(BreadcrumbService);
}
