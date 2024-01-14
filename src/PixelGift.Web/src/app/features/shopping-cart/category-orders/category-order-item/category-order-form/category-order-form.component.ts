import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormField } from 'src/app/core/models';
import {
  FormArray,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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

  ngOnInit(): void {
    this.initFormArray();
  }

  private initFormArray(): void {
    for (const _ of this.formFields) {
      this.form.push(
        new FormControl<string>('', [
          Validators.required,
          Validators.minLength(2),
        ])
      );
    }
  }
}
