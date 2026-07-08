import { describe, expect, it } from 'vitest';

import { limitCharacters } from './limit-characters';

describe('limitCharacters', () => {
  it('returns the original string when shorter than the limit', () => {
    expect(limitCharacters('hello', 10)).toBe('hello');
  });

  it('returns the original string when equal to the limit', () => {
    expect(limitCharacters('hello', 5)).toBe('hello');
  });

  it('truncates the string when longer than the limit', () => {
    expect(limitCharacters('hello world', 5)).toBe('hello');
  });

  it('returns an empty string when the limit is 0', () => {
    expect(limitCharacters('hello', 0)).toBe('');
  });

  it('throws when the limit is negative', () => {
    expect(() => limitCharacters('hello', -1)).toThrow(
      'maxLength must be greater than or equal to 0',
    );
  });
});
