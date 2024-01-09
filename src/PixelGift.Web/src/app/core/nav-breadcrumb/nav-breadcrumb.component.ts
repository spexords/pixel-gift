import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule, BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-nav-breadcrumb',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule],
  templateUrl: './nav-breadcrumb.component.html',
  styleUrl: './nav-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBreadcrumbComponent {
  bcService = inject(BreadcrumbService);
}
