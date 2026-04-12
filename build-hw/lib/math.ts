import { sum } from 'lodash';

export const add = (...values: number[]): number => sum(values);

export const multiply = (a: number, b: number): number => a * b;
