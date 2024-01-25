import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Status } from './status.enum';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent {
  statuses = Status;
  @Input() status: Status = Status.Default;
}
