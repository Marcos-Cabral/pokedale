export interface DialogProps {
  onSuccess: () => void;
  onClose: () => void;
  children: React.ReactNode;
  visible: boolean;
}
