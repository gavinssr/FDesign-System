export interface ComponentContract {
  component: string;
  purpose: string;
  provisional?: boolean;
  platform_notes?: Partial<Record<'h5' | 'rn' | 'weex', string>>;
  forbidden?: string[];
  a11y?: string[];
  slots?: Record<string, string>;
  states: string[];
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((item) => typeof item === 'string')
  );
}

export function validateComponentContractShape(input: unknown): string[] {
  const errors: string[] = [];

  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    return ['contract must be an object'];
  }

  const contract = input as Partial<ComponentContract>;

  if (typeof contract.component !== 'string' || contract.component.trim().length === 0) {
    errors.push('component must be a non-empty string');
  }

  if (typeof contract.purpose !== 'string' || contract.purpose.trim().length === 0) {
    errors.push('purpose must be a non-empty string');
  }

  if (!isStringArray(contract.states) || contract.states.length === 0) {
    errors.push('states must be a non-empty string array');
  }

  if (
    contract.provisional !== undefined &&
    typeof contract.provisional !== 'boolean'
  ) {
    errors.push('provisional must be a boolean when provided');
  }

  if (
    contract.platform_notes !== undefined &&
    !isStringRecord(contract.platform_notes)
  ) {
    errors.push('platform_notes must be an object of string values');
  }

  if (contract.forbidden !== undefined && !isStringArray(contract.forbidden)) {
    errors.push('forbidden must be a string array when provided');
  }

  if (contract.a11y !== undefined && !isStringArray(contract.a11y)) {
    errors.push('a11y must be a string array when provided');
  }

  if (contract.slots !== undefined && !isStringRecord(contract.slots)) {
    errors.push('slots must be an object of string values when provided');
  }

  return errors;
}
