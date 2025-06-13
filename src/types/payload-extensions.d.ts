import 'payload-plugin-form-builder';

declare module 'payload-plugin-form-builder' {
  export interface NumberField {
    blockName?: string;
    blockType: 'number';
    defaultValue?: number;
    label?: string;
    name: string;
    required?: boolean;
    width?: number;
  }

  export type FormFieldBlock =
    | CheckboxField
    | CountryField
    | DateField
    | EmailField
    | MessageField
    | PaymentField
    | RadioField
    | SelectField
    | StateField
    | TextAreaField
    | TextField
    | NumberField; // Agrega el campo de tipo "number"
}
