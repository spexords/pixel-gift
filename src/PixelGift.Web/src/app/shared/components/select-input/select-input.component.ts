import { ChangeDetectionStrategy, Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgControl } from '@angular/forms';
import { ErrorValidationMessagesComponent } from '../error-validation-messages/error-validation-messages.component';
import { SelectOption } from '../../utils';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ErrorValidationMessagesComponent],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectInputComponent {
  private _value: unknown;

  onChange: any = () => {};
  onTouch: any = () => {};

  @Input() options: SelectOption<any>[] = []
  @Input() disabled = false;
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
  }

  writeValue(value: unknown): void {
    this.value = value;
    this.onChange(value);
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
}
