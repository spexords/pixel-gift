import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JumbotronComponent {}
