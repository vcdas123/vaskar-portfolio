/**
 * Formats elapsed experience the way the reference script does — e.g.
 * `3 yrs 4 mos`, `1 yr`, `0 yrs 7 mos`.
 *
 * `careerStart` is an ISO calendar date parsed in local time, matching the
 * reference's `new Date(\`${value}T00:00:00\`)`, and the day-of-month check
 * prevents counting a month that has not completed yet.
 */
export const formatExperienceSince = (careerStart: string, now: Date = new Date()): string => {
  const start = new Date(`${careerStart}T00:00:00`);

  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) {
    months -= 1;
  }

  const years = Math.floor(months / 12);
  const remaining = months % 12;

  const yearPart = `${years} yr${years === 1 ? '' : 's'}`;
  const monthPart = remaining ? ` ${remaining} mo${remaining === 1 ? '' : 's'}` : '';

  return `${yearPart}${monthPart}`;
};
