import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AdminPanelService } from '../../admin-panel.service';
import { ChangePassword } from '../../models';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
  private adminPanelService = inject(AdminPanelService);

  form = new FormGroup(
    {
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmNewPassword: new FormControl('', Validators.required),
    },
    this.passwordMatchValidator
  );

  onSubmit(): void {
    this.adminPanelService
      .changePassword(this.form.value as ChangePassword)
      .subscribe({
        next: () => alert('Password changed successfully'),
        error: () => alert('Failed to change password'),
      });
  }

  passwordMatchValidator(form: any): ValidationErrors | null {
    return form.controls['newPassword'].value ===
      form.controls['confirmNewPassword'].value
      ? null
      : { mismatch: true };
  }
}
