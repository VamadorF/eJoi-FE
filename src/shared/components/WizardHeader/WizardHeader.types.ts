export interface WizardHeaderProps {
  title?: string;
  step: number;
  total: number;
  onBack?: () => void;
  onClose?: () => void;
  showClose?: boolean;
}

