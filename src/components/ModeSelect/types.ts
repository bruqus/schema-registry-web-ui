import type { Mode } from 'types';

export type IModeSelectProps = {
  onChange: (mode: Mode) => void;
  value: Mode | null;
  label?: string;
  autoFocus?: boolean;
};
