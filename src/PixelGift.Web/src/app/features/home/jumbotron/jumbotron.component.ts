import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { NavbarService } from 'src/app/core/navbar/navbar.service';

@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JumbotronComponent {
  navbarService = inject(NavbarService);
}
