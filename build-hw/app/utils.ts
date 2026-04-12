export const formatUserName = (firstName: string, lastName: string): string =>
  `${firstName.trim()} ${lastName.trim()}`;

export const multiply = (a: number, b: number): number => a * b;

export const unusedHeavyCalculation = (): number => {
  return Array.from({ length: 3000 }, (_, i) => i).reduce((acc, n) => acc + n, 0);
};

export const unusedDebugLabel = 'THIS_SHOULD_NOT_BE_IN_BUNDLE';
