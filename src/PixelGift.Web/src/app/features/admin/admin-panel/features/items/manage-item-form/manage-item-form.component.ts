import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { ImageUploadComponent } from 'src/app/shared/components/image-upload/image-upload.component';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { AdminActions, AdminSelectors } from '../../../state';
import { ItemPayloadRequest } from '../../../models';
import { isEmpty } from 'lodash';
import { tap } from 'rxjs';

type ItemForm = FormGroup<{
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  polishName: FormControl<string | null>;
  base64Image: FormControl<string | null>;
  quantity: FormControl<number | null>;
  unitPrice: FormControl<number | null>;
  categoryId: FormControl<string | null>;
}>;

@Component({
  selector: 'app-manage-item-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ImageUploadComponent,
    LetDirective,
  ],
  templateUrl: './manage-item-form.component.html',
  styleUrl: './manage-item-form.component.scss',
})
export class ManageItemFormComponent {
  private store = inject(Store);

  initialized = true;
  form = this.createForm();
  categories$ = this.store
    .select(AdminSelectors.selectCategoriesAsOptions)
    .pipe(
      tap((categories) => {
        if (isEmpty(categories)) {
          this.store.dispatch(AdminActions.getCategories());
        }
      })
    );

  @Input() set data(data: ItemPayloadRequest) {
    this.updateForm(data);
  }
  @Output() submitted = new EventEmitter<ItemPayloadRequest>();

  onSubmit(): void {
    this.submitted.emit(this.form.value as ItemPayloadRequest);
  }

  updateImageForm(base64Image: string): void {
    this.form.controls.base64Image.patchValue(base64Image);
  }

  private createForm(): ItemForm {
    const form = new FormGroup({
      id: new FormControl(uuidv4()),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      polishName: new FormControl('', [Validators.required]),
      base64Image: new FormControl('', [Validators.required]),
      quantity: new FormControl<number>(0, [Validators.required]),
      unitPrice: new FormControl<number>(1.0, [Validators.required]),
      categoryId: new FormControl<string | null>(null, [Validators.required]),
    });

    return form;
  }

  private updateForm(data: ItemPayloadRequest) {
    this.form.patchValue(data);
    this.initialized = false;
  }
}
