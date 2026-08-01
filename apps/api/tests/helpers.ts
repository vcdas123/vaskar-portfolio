import type { Express } from 'express';
import { createApp } from '../src/app';

let cached: Express | undefined;

/** One Express instance shared by the suites; it holds no per-request state. */
export const testApp = (): Express => {
  cached ??= createApp();
  return cached;
};

interface Envelope<TData> {
  ok: boolean;
  data?: TData;
  error?: { code: string; message: string; details?: Array<{ path: string; message: string }> };
}

/** Narrows a response body to a successful envelope, failing loudly otherwise. */
export const expectData = <TData>(body: unknown): TData => {
  const envelope = body as Envelope<TData>;
  if (!envelope.ok || envelope.data === undefined) {
    throw new Error(`Expected a success envelope, received: ${JSON.stringify(body)}`);
  }
  return envelope.data;
};

export const expectError = (body: unknown): NonNullable<Envelope<never>['error']> => {
  const envelope = body as Envelope<never>;
  if (envelope.ok || !envelope.error) {
    throw new Error(`Expected a failure envelope, received: ${JSON.stringify(body)}`);
  }
  return envelope.error;
};
