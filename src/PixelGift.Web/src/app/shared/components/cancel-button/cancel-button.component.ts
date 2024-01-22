import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancel-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cancel-button.component.html',
  styleUrl: './cancel-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelButtonComponent {}
