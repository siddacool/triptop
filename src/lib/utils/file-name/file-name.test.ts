import { describe, expect, it } from 'vitest';

import { toSafeFilename } from './file-name';

describe('toSafeFilename', () => {
  it('returns the original string when already valid', () => {
    expect(toSafeFilename('Trip Budget')).toBe('Trip Budget');
  });

  it('removes invalid filename characters', () => {
    expect(toSafeFilename('Trip: Budget?*.pdf')).toBe('Trip Budget.pdf');
  });

  it('removes control characters', () => {
    expect(toSafeFilename('Hello\nWorld\t')).toBe('HelloWorld');
  });

  it('collapses consecutive spaces', () => {
    expect(toSafeFilename('Trip     Budget')).toBe('Trip Budget');
  });

  it('trims leading and trailing whitespace', () => {
    expect(toSafeFilename('  Trip Budget  ')).toBe('Trip Budget');
  });

  it('removes trailing dots and spaces', () => {
    expect(toSafeFilename('Trip Budget...   ')).toBe('Trip Budget');
  });

  it('limits the filename length', () => {
    expect(toSafeFilename('Hello World', 5)).toBe('Hello');
  });

  it('returns an empty string when given only invalid characters', () => {
    expect(toSafeFilename('<>:"/\\|?*')).toBe('');
  });
});
