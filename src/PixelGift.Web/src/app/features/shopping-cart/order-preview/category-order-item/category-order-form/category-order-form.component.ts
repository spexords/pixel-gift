import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormField, FormFieldData } from 'src/app/core/models';
import {
  FormArray,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-category-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-order-form.component.html',
  styleUrl: './category-order-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryOrderFormComponent implements OnInit {
  form = new FormArray<FormControl<string | null>>([]);
  promoCodeControl = new FormControl<string>('');

  @Input({ required: true }) formFields!: FormField[];
  @Input() formFieldsData!: FormFieldData[];
  @Input() promoCode!: string;
  @Output() promoCodeChanged = new EventEmitter<string>();
  @Output() formFieldsChanged = new EventEmitter<FormFieldData[]>();

  ngOnInit(): void {
    this.initFormArray();
    this.initPromoCodeBehaviour();
    this.tryUpdateFormFieldsData();
    this.tryUpdatePromoCode();
  }

  initPromoCodeBehaviour(): void {
    this.promoCodeControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => this.promoCodeChanged.emit(value as string));
  }

  private initFormArray(): void {
    for (const formField of this.formFields) {
      this.form.push(
        new FormControl<string>(
          formField.fieldType === 'Select' ? formField.options[0] : '',
          [Validators.required, Validators.minLength(2)]
        )
      );
    }

    this.emitFormFields(this.form.value);

    this.form.valueChanges.pipe(debounceTime(200)).subscribe((values) => {
      this.emitFormFields(values);
    });
  }

  private emitFormFields(values: (string | null)[]) {
    this.formFieldsChanged.emit(
      this.formFields.map((value, index) => ({
        key: value.name,
        value: values[index] as string,
      }))
    );
  }

  private tryUpdateFormFieldsData(): void {
    for (let i = 0; i < this.formFieldsData.length; i++) {
      this.form.controls[i].patchValue(this.formFieldsData[i].value);
    }
  }

  tryUpdatePromoCode() {
    this.promoCodeControl.patchValue(this.promoCode);
  }
}
