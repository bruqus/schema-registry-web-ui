import type { SchemaVersion } from 'types';

export type IVersionSelectProps = {
  versions: SchemaVersion[];
  onChange: (version: SchemaVersion) => void;
  value?: SchemaVersion;
};
