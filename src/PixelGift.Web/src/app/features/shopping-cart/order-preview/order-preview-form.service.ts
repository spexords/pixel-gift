import { isEqual } from 'lodash';
import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';
import { OrderCategory, OrderPreview } from 'src/app/core/models';

@Injectable()
export class OrderPreviewFormService {
  private shoppingCartService = inject(ShoppingCartService);
  private formBuilder = inject(FormBuilder);
  private formSource = new BehaviorSubject<FormGroup | null>(null);

  formChanged$ = this.formSource.asObservable();

  constructor() {
    this.updateFormIfOrderPreviewChanged();
  }

  updateFormIfOrderPreviewChanged(): void {
    this.shoppingCartService.orderPreview$
      .pipe(distinctUntilChanged(compareOrderPreview))
      .subscribe((orderPreview) => {
        this.buildForm(orderPreview.orderCategories);
      });
  }

  private buildForm(orderCategories: OrderCategory[]): void {
    const form = this.formBuilder.group({});

    for (const orderCategory of orderCategories) {
      const orderCategoryFormGroup = this.formBuilder.group({});

      for (const formField of orderCategory.formFields) {
        orderCategoryFormGroup.addControl(
          formField.name,
          this.formBuilder.control(
            formField.fieldType === 'Select' ? formField.options[0] : '',
            Validators.required
          )
        );
      }
      orderCategoryFormGroup.addControl(
        'promoCode',
        this.formBuilder.control('')
      );

      form.addControl(orderCategory.id, orderCategoryFormGroup);
    }

    if (this.formSource.value?.value) {
      form.patchValue(this.formSource.value?.value);
    }

    this.formSource.next(form);
  }
}

function compareOrderPreview(
  previous: OrderPreview,
  current: OrderPreview
): boolean {
  const previousData = mapToComparableFormData(previous);
  const currentData = mapToComparableFormData(current);

  return isEqual(previousData, currentData);
}

function mapToComparableFormData(orderPreview: OrderPreview) {
  return orderPreview?.orderCategories.map((category) => ({
    id: category.id,
    fields: category.formFields.map((field) => ({
      id: field.id,
      name: field.name,
    })),
  }));
}
