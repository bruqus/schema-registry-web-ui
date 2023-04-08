import { accessMode } from 'constants/mode';

export type Mode = (typeof accessMode)[keyof typeof accessMode];
