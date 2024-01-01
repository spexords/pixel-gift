import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryPayloadRequest, FieldType } from 'src/app/core/models';
import { v4 as uuidv4 } from 'uuid';
import { enumToArray } from 'src/app/shared/utils';

type FormFieldForm = FormGroup<{
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  fieldType: FormControl<string | null>;
  options: FormArray<FormControl<string | null>>;
}>;

type CategoryForm = FormGroup<{
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  formFields: FormArray<FormFieldForm>;
}>;

@Component({
  selector: 'app-manage-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './manage-category-form.component.html',
  styleUrl: './manage-category-form.component.scss',
})
export class ManageCategoryFormComponent {
  initialized = true;
  form = this.createForm();
  fieldTypeOptions = enumToArray(FieldType);

  @Input() set data(data: CategoryPayloadRequest) {
    this.updateForm(data);
  }
  @Output() submitted = new EventEmitter<CategoryPayloadRequest>();

  onSubmit(): void {
    this.submitted.emit(this.form.value as CategoryPayloadRequest);
  }

  addFormField(): void {
    this.addFormControlField('', FieldType.Input.toString());
  }

  removeFormField(index: number): void {
    this.form.controls.formFields.removeAt(index);
  }

  addFormFieldSelectOption(index: number): void {
    const formGroup = this.form.controls.formFields.at(index);
    formGroup.controls.options.push(new FormControl('', [Validators.required]));
  }

  removeFormFieldSelectOption(groupIndex: number, controlIndex: number): void {
    const formGroup = this.form.controls.formFields.at(groupIndex);
    formGroup.controls.options.removeAt(controlIndex);
  }

  private createForm(): CategoryForm {
    const form = new FormGroup({
      id: new FormControl(uuidv4()),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      formFields: new FormArray<FormFieldForm>([]),
    });

    const control = this.createFormControlField('', FieldType.Input.toString());

    form.controls.formFields.push(control);

    return form;
  }

  private addFormControlField(name: string, fieldType: string): void {
    const control = this.createFormControlField(name, fieldType);

    this.form.controls.formFields.push(control);
  }

  private createFormControlField(
    name: string,
    fieldType: string,
    id?: string,
    options?: string[]
  ): FormFieldForm {
    const control = new FormGroup({
      id: new FormControl(id ?? uuidv4()),
      name: new FormControl<string>(name, [
        Validators.required,
        Validators.minLength(2),
      ]),
      fieldType: new FormControl<string>(fieldType, [Validators.required]),
      options: new FormArray<FormControl<string | null>>([]),
    });

    if (options && options.length > 0) {
      options.forEach((option) => {
        control.controls.options.push(new FormControl(option));
      });
    } else {
      control.controls.options.push(new FormControl(''));
    }

    return control;
  }

  private updateForm(data: CategoryPayloadRequest): void {

    const { formFields } = data;

    this.form.controls.formFields.clear();

    formFields.forEach((formField) => {
      const formControlField = this.createFormControlField(
        formField.name,
        formField.fieldType,
        formField.id,
        formField.options
      );
      this.form.controls.formFields.push(formControlField);
    });

    this.form.patchValue(data);

    this.initialized = false;
  }
}
