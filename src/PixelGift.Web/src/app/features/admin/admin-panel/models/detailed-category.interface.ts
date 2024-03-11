import { FormField } from '../../../shopping-cart/models/form-field.interface';

export interface DetailedCategory {
  id: string;
  name: string;
  formFields: FormField[];
}
