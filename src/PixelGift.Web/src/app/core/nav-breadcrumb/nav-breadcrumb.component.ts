import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule, BreadcrumbService } from 'xng-breadcrumb';
import { LangSwitcherComponent } from 'src/app/shared/components/lang-switcher/lang-switcher.component';

@Component({
  selector: 'app-nav-breadcrumb',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, LangSwitcherComponent],
  templateUrl: './nav-breadcrumb.component.html',
  styleUrl: './nav-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBreadcrumbComponent {
  bcService = inject(BreadcrumbService);
}
