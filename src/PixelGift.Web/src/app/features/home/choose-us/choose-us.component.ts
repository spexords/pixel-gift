import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-choose-us',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './choose-us.component.html',
  styleUrl: './choose-us.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseUsComponent {}
