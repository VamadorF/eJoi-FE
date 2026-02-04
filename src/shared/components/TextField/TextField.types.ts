export interface TextFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  error?: string;
  helperText?: string;
  maxLength?: number;
}

