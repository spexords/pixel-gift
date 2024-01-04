import { FormField } from './form-field.interface';

export interface CategoryPayloadRequest {
  id: string;
  name: string;
  formFields: FormField[];
}
