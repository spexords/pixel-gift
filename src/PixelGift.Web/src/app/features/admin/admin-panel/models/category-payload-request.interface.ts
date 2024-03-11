import { FormField } from '../../../shopping-cart/models/form-field.interface';

export interface CategoryPayloadRequest {
  id: string;
  name: string;
  formFields: FormField[];
}
