import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './choose-us.component.html',
  styleUrl: './choose-us.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseUsComponent {}
