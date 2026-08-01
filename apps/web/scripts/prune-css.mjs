/**
 * Removes dead selectors from a stylesheet.
 *
 * A naive regex delete corrupts multi-selector rules: dropping `.tree li` out of
 * `.tree li, .tab { … }` by matching rule text leaves a dangling `.tab {` or an
 * orphaned `,`. This walks the rules instead, filters the selector *list* of each
 * one, and drops a rule only when nothing is left to style. @media blocks are
 * recursed into and dropped when they empty out.
 *
 * Usage: node scripts/prune-css.mjs <file> <selector-prefix>...
 */
import { readFileSync, writeFileSync } from 'node:fs';

/** Splits a stylesheet into top-level chunks: comments, at-rules and rules. */
const chunk = (css) => {
  const parts = [];
  let i = 0;
  while (i < css.length) {
    if (css.startsWith('/*', i)) {
      const end = css.indexOf('*/', i + 2);
      const stop = end === -1 ? css.length : end + 2;
      parts.push({ kind: 'comment', text: css.slice(i, stop) });
      i = stop;
      continue;
    }
    if (/\s/.test(css[i])) {
      let j = i;
      while (j < css.length && /\s/.test(css[j])) j += 1;
      parts.push({ kind: 'space', text: css.slice(i, j) });
      i = j;
      continue;
    }
    // Read a selector/at-rule prelude up to its block.
    const open = css.indexOf('{', i);
    if (open === -1) {
      parts.push({ kind: 'space', text: css.slice(i) });
      break;
    }
    let depth = 0;
    let j = open;
    for (; j < css.length; j += 1) {
      if (css[j] === '{') depth += 1;
      else if (css[j] === '}') {
        depth -= 1;
        if (depth === 0) break;
      }
    }
    parts.push({
      kind: 'rule',
      prelude: css.slice(i, open).trim(),
      body: css.slice(open + 1, j),
      text: css.slice(i, j + 1),
    });
    i = j + 1;
  }
  return parts;
};

const isDead = (selector, deadList) => {
  const s = selector.trim();
  return deadList.some(
    (dead) => s === dead || s.startsWith(`${dead} `) || s.startsWith(`${dead}.`) ||
      s.startsWith(`${dead}:`) || s.startsWith(`${dead}>`) || s.includes(` ${dead}`) ||
      s.startsWith(`${dead},`),
  );
};

const prune = (css, deadList) => {
  const out = [];
  for (const part of chunk(css)) {
    if (part.kind !== 'rule') {
      out.push(part.text);
      continue;
    }

    // Nested at-rule (@media, @supports): recurse. Keyframes have no selectors.
    if (part.prelude.startsWith('@') && !part.prelude.startsWith('@keyframes')) {
      const inner = prune(part.body, deadList).trim();
      if (inner) out.push(`${part.prelude} {\n${indent(inner)}\n}`);
      continue;
    }
    if (part.prelude.startsWith('@')) {
      out.push(part.text);
      continue;
    }

    const kept = part.prelude
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s && !isDead(s, deadList));
    if (kept.length === 0) continue;
    out.push(`${kept.join(',\n')} {${part.body}}`);
  }
  return out.join('');
};

const indent = (text) =>
  text
    .split('\n')
    .map((line) => (line.trim() ? `  ${line}` : line))
    .join('\n');

const [file, ...dead] = process.argv.slice(2);
const before = readFileSync(file, 'utf8');
const after = prune(before, dead);

// Structural validation: braces must balance and no rule may have an empty selector.
const balance = [...after].reduce((n, c) => n + (c === '{' ? 1 : c === '}' ? -1 : 0), 0);
if (balance !== 0) throw new Error(`${file}: unbalanced braces (${balance})`);
if (/(^|\n)\s*\{/.test(after)) throw new Error(`${file}: rule with empty selector`);
if (/,\s*\{/.test(after)) throw new Error(`${file}: dangling comma before block`);

writeFileSync(file, after);
// eslint-disable-next-line no-console
console.log(`  ${file.split('/').pop()}: ${before.length} -> ${after.length} bytes`);
