export interface FormField {
  id: string;
  name: string;
  fieldType: 'Select' | 'Input';
  options: string[];
}
