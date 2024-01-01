import { FormField } from './form-field.interface';

export interface DetailedCategory {
  id: string;
  name: string;
  formFields: FormField[];
}
