import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormField, SelectOption } from 'src/app/core/models';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';
import { SelectInputComponent } from 'src/app/shared/components/select-input/select-input.component';

@Component({
  selector: 'app-category-order-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    SelectInputComponent,
  ],
  templateUrl: './category-order-form.component.html',
  styleUrl: './category-order-form.component.scss',
})
export class CategoryOrderFormComponent {
  private subscription: Subscription | undefined = undefined;
  private destroyRef = inject(DestroyRef);
  form!: FormGroup;

  @Input({ required: true }) formFields!: FormField[];
  @Input({ required: true }) set categoryForm(form: FormGroup) {
    this.updateForm(form);
  }
  @Output() promoCodeChanged = new EventEmitter<string>();

  getSelectOptions(values: string[]): SelectOption<unknown>[] {
    return values.map((value) => ({ value, displayValue: value }));
  }

  private updateForm(form: FormGroup) {
    this.form = form;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = form
      .get('promoCode')
      ?.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(400)
      )
      .subscribe((promoCode) => {
        this.promoCodeChanged.emit(promoCode);
      });
  }
}
