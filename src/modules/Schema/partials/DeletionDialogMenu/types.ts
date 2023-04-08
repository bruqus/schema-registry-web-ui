import { SchemaSubject, SchemaVersion } from 'types';

export type OptionType = 'latest' | 'selected' | 'subject';

export type IDeletionDialogMenuProps = {
  onCancel?: () => void;
  onConfirm?: (type: OptionType, version?: SchemaVersion) => void;
  selectedVersion?: SchemaVersion;
  multipleOptions?: boolean;
  subject?: SchemaSubject;
};
