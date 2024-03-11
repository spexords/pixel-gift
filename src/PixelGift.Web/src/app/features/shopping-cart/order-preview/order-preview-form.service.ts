import { cloneDeep, isEqual } from 'lodash';
import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { ShoppingCartSelectors } from '../state';
import { OrderCategory, OrderPreview, OrderPreviewFormData } from '../models';

@Injectable()
export class OrderPreviewFormService {
  private store = inject(Store);
  private formBuilder = inject(FormBuilder);
  private cachedValues: OrderPreviewFormData | null = null;

  form$ = this.store.select(ShoppingCartSelectors.selectOrderPreview).pipe(
    distinctUntilChanged(compareOrderPreview),
    filter((x) => !!x),
    map((x) => this.buildForm(x!.orderCategories)),
  );


  private buildForm(orderCategories: OrderCategory[]): FormGroup<any> {
    const form = this.formBuilder.group({});

    for (const orderCategory of orderCategories) {
      const orderCategoryFormGroup = this.formBuilder.group({});

      for (const formField of orderCategory.formFields) {
        orderCategoryFormGroup.addControl(
          formField.name,
          this.formBuilder.control(
            formField.fieldType === 'Select' ? formField.options[0] : '',
            Validators.required,
          ),
        );
      }
      orderCategoryFormGroup.addControl(
        'promoCode',
        this.formBuilder.control(''),
      );

      form.addControl(orderCategory.id, orderCategoryFormGroup);
    }

    if (this.cachedValues) {
      form.patchValue(this.cachedValues);
    }

    this.cachedValues = cloneDeep(form.value);

    return form;
  }
}

function compareOrderPreview(
  previous: OrderPreview | null,
  current: OrderPreview | null,
): boolean {
  const previousData = mapToComparableFormData(previous);
  const currentData = mapToComparableFormData(current);

  return isEqual(previousData, currentData);
}

function mapToComparableFormData(orderPreview: OrderPreview | null) {
  return orderPreview?.orderCategories.map((category) => ({
    id: category.id,
    fields: category.formFields.map((field) => ({
      id: field.id,
      name: field.name,
    })),
  }));
}
