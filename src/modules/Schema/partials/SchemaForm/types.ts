import type { Schema } from 'types';

export type ISchemaFormProps = {
  schema: Schema | null;
  subject: string;
  multiVersion?: boolean;
  code: string;
  onChangeCode?: (newCode?: string) => void;
  onUpdate?: () => void;
};
