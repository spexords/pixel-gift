import {
  Component,
  DestroyRef,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';
import { SelectInputComponent } from 'src/app/shared/components/select-input/select-input.component';
import { Store } from '@ngrx/store';
import { ShoppingCartActions } from '../../../state';
import { FormField } from '../../../models';
import { SelectOption } from 'src/app/shared/utils';

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
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private subscription: Subscription | undefined = undefined;
  form!: FormGroup;

  @Input({ required: true }) formFields!: FormField[];
  @Input({ required: true }) set categoryForm(form: FormGroup) {
    this.updateForm(form);
  }

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
        debounceTime(400),
      )
      .subscribe(() => {
        this.store.dispatch(ShoppingCartActions.promoCodeUpdated());
      });
  }
}
