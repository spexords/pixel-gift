import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JumbotronComponent {}
