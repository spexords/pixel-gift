import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgControl } from '@angular/forms';
import { ErrorValidationMessagesComponent } from '../error-validation-messages/error-validation-messages.component';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ErrorValidationMessagesComponent],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent {
  private _value: unknown;
  private touched = false;

  onChange: any = () => {};
  onTouch: any = () => {};

  @Input() disabled = false;
  @Input() type = 'text';
  @Input() label = '';

  constructor(@Optional() @Self() public controlDir?: NgControl) {
    if (controlDir) {
      controlDir.valueAccessor = this;
    }
  }

  get value() {
    return this._value;
  }

  set value(value: unknown) {
    this._value = value;
    this.onChange(value);
    this.markAsTouched();
  }

  writeValue(value: unknown): void {
    this.value = value;
    this.onChange(value);
    this.markAsTouched();
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
      this.touched = true;
      this.onTouch();
    }
  }
}
