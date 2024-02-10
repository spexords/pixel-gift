import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-counter-button',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './counter-button.component.html',
  styleUrl: './counter-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CounterButtonComponent,
    },
  ],
})
export class CounterButtonComponent implements ControlValueAccessor {
  private touched = false;
  quantity = 0;
  onChange: any = () => {};
  onTouch: any = () => {};

  @Input() disabled: boolean = false;

  increase(): void {
    this.markAsTouched();
    if (!this.disabled) {
      this.quantity += 1;
      this.onChange(this.quantity);
    }
  }

  decrease(): void {
    this.markAsTouched();
    if (!this.disabled) {
      this.quantity -= 1;
      this.onChange(this.quantity);
    }
  }

  writeValue(value: number): void {
    this.quantity = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private markAsTouched(): void {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
  }
}
