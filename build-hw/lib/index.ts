import type { ReactElement } from 'react';

export { add, multiply } from './math';
export { capitalize, toKebabCase } from './string';

export const identityElement = (element: ReactElement): ReactElement => element;
