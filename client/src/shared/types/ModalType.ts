type ModalContent = {
  title: string;
  message: string;
};

type ModalAction = (params?: unknown) => void | null;

export type ModalProps = {
  onAction?: ModalAction;
} & ModalContent;
