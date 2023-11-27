import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { AdminPanelService } from '../../../admin-panel.service';
import { CreateCategory } from 'src/app/core/models';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
})
export class CreateCategoryComponent {
  private dialogRef = inject(MatDialogRef<CreateCategoryComponent>);
  private adminPanelService = inject(AdminPanelService);

  form = new FormGroup({
    id: new FormControl(uuidv4()),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  get controlKeys() {
    return Object.keys(this.form.controls);
  }

  onSubmit(): void {
    this.adminPanelService
      .createCategory(this.form.value as CreateCategory)
      .subscribe({
        next: () => this.dialogRef.close(),
        error: (e) => alert(e.error.errors.message),
      });
  }
}
