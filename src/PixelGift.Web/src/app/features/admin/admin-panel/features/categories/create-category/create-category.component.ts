import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { AdminPanelService } from '../../../admin-panel.service';
import { CreateCategory, FieldType } from 'src/app/core/models';
import { enumToArray } from 'src/app/shared/utils';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
})
export class CreateCategoryComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<CreateCategoryComponent>);
  private adminPanelService = inject(AdminPanelService);

  fieldTypeOptions = enumToArray(FieldType);
  form = new FormGroup({
    id: new FormControl(uuidv4()),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    currentForm: new FormArray<any>([]),
  });

  ngOnInit(): void {
    this.addDefaultControlField();
  }

  get controlKeys(): string[] {
    return Object.keys(this.form.controls);
  }

  get formArray() {
    return this.form.controls.currentForm as FormArray<
      FormGroup<{
        key: FormControl<string | null>;
        type: FormControl<string | null>;
        options: FormArray<FormControl<string | null>>;
      }>
    >;
  }

  addDefaultControlField(): void {
    this.addFormControlField('', FieldType.Input.toString());
  }

  addFormControlField(key: string, type: string): void {
    const control = new FormGroup({
      key: new FormControl<string>(key, [
        Validators.required,
        Validators.minLength(2),
      ]),
      type: new FormControl<string>(type, [Validators.required]),
      options: new FormArray<FormControl<string | null>>([]),
    });

    control.controls.options.push(new FormControl(''));

    this.formArray.push(control);
  }

  removeFormControlField(index: number): void {
    this.formArray.removeAt(index);
  }

  addFormControlOption(index: number): void {
    const formGroup = this.formArray.at(index);
    formGroup.controls.options.push(new FormControl('', [Validators.required]));
  }

  removeFormControlOption(groupIndex: number, controlIndex: number): void {
    const formGroup = this.formArray.at(groupIndex);
    formGroup.controls.options.removeAt(controlIndex);
  }

  onSubmit(): void {
    console.log(this.form.value);

    this.adminPanelService
      .createCategory(this.form.value as CreateCategory)
      .subscribe({
        next: () => this.dialogRef.close(),
        error: (e) => alert(e.error.errors.message),
      });
  }
}
