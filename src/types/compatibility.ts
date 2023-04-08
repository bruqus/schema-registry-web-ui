import { compatibilityLevel } from 'constants/config';

export type Compatibility = (typeof compatibilityLevel)[keyof typeof compatibilityLevel];
