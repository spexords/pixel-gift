import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { PromoCodePayloadRequest } from 'src/app/core/models';

type PromoCodeForm = FormGroup<{
  id: FormControl<string | null>;
  code: FormControl<string | null>;
  discount: FormControl<number | null>;
  expiry: FormControl<Date | null>;
}>;

@Component({
  selector: 'app-manage-promo-code-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './manage-promo-code-form.component.html',
  styleUrl: './manage-promo-code-form.component.scss',
})
export class ManagePromoCodeFormComponent {
  initialized = true;
  form = this.createForm();

  @Input() set data(data: PromoCodePayloadRequest) {
    this.updateForm(data);
  }
  @Output() submitted = new EventEmitter<PromoCodePayloadRequest>();

  createForm(): PromoCodeForm {
    const form = new FormGroup({
      id: new FormControl(uuidv4()),
      code: new FormControl('', [Validators.required, Validators.minLength(2)]),
      discount: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(1),
      ]),
      expiry: new FormControl(new Date()),
    });

    return form;
  }

  onSubmit(): void {
    this.submitted.emit(this.form.value as PromoCodePayloadRequest);
  }

  updateExpiry(event: any) {
    const date = new Date(event.target.value);
    this.form.controls.expiry.patchValue(date, { emitEvent: false });
  }

  updateForm(data: PromoCodePayloadRequest) {
    this.form.patchValue(data);
    this.initialized = false;
  }
}
