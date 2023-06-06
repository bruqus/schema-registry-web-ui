import type { Schema } from 'types';

export type IEditFormProps = {
  schema: Schema | null;
  multiVersion?: boolean;
  changes: string;
  isEditing: boolean;
  onChange?: (newCode?: string) => void;
  onRemove?: () => void;
  onUpdate?: () => void;
  onChangeMode?: (p: { isEditing: boolean }) => void;
};
