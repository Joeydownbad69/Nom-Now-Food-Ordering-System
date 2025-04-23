export interface OrderItem {
  id: number;
  name: string;
  price: number;
}

export interface CheckoutFormProps {
  currentStep: number;
  onSubmit: (formData: any) => void;
  isSubmitting: boolean;
}

export interface CheckoutStepsProps {
  currentStep: number;
  onChange: (step: number) => void;
}

export interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  options: SelectOption[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

export interface OrderSummaryProps {
  items: OrderItem[];
}