import { Compatibility } from 'types';

export type ICompatibilityLevelSelectProps = {
  onChange: (level: Compatibility) => void;
  value: Compatibility | null;
  autoFocus?: boolean;
  size?: 'small' | 'medium';
  label?: string;
};
