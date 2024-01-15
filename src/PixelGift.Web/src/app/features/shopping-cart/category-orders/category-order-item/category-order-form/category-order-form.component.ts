import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormField } from 'src/app/core/models';
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
  @Output() promoCodeChanged = new EventEmitter<string>();

  ngOnInit(): void {
    this.initFormArray();
    this.initPromoCodeBehaviour();
  }

  initPromoCodeBehaviour(): void {
    this.promoCodeControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => this.promoCodeChanged.emit(value as string));
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
