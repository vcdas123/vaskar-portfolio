import { describe, expect, it } from 'vitest';
import { formatExperienceSince } from '../../src/lib/experience';

/** Mirrors the reference script's `experienceSince`, including its pluralisation. */
describe('formatExperienceSince', () => {
  it('formats whole years', () => {
    expect(formatExperienceSince('2023-04-01', new Date('2026-04-01T12:00:00'))).toBe('3 yrs');
  });

  it('formats years and months', () => {
    expect(formatExperienceSince('2023-04-01', new Date('2026-08-01T12:00:00'))).toBe(
      '3 yrs 4 mos',
    );
  });

  it('uses singular units where appropriate', () => {
    expect(formatExperienceSince('2023-04-01', new Date('2024-05-01T12:00:00'))).toBe('1 yr 1 mo');
  });

  it('does not count a month that has not completed', () => {
    // One day short of the anniversary rolling the month over.
    expect(formatExperienceSince('2023-04-15', new Date('2026-08-14T12:00:00'))).toBe(
      '3 yrs 3 mos',
    );
    expect(formatExperienceSince('2023-04-15', new Date('2026-08-15T12:00:00'))).toBe(
      '3 yrs 4 mos',
    );
  });

  it('handles the first month of employment', () => {
    expect(formatExperienceSince('2026-07-01', new Date('2026-07-20T12:00:00'))).toBe('0 yrs');
  });
});
