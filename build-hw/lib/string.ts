export const capitalize = (value: string): string =>
  value.length ? value[0].toUpperCase() + value.slice(1) : value;

export const toKebabCase = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
