
export interface QAPair {
  question: string;
  answer: string;
}

export interface QADialogProps {
  qaPairs: QAPair[];
  onChange: (qaPairs: QAPair[]) => void;
}

export interface QAListItemProps {
  pair: QAPair;
  onDelete: () => void;
  t: (key: string) => string;
}

export interface QAAddFormProps {
  onAdd: (question: string, answer: string) => void;
  t: (key: string) => string;
}
