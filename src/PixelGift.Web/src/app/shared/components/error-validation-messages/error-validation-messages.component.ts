import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@ngneat/transloco';
import { ValidationErrors } from '@angular/forms';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'app-error-validation-messages',
  standalone: true,
  imports: [CommonModule, LetDirective],
  templateUrl: './error-validation-messages.component.html',
  styleUrl: './error-validation-messages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorValidationMessagesComponent {
  private translocoService = inject(TranslocoService);

  lang$ = this.translocoService.langChanges$;

  @Input() errors: ValidationErrors | null | undefined;
}
