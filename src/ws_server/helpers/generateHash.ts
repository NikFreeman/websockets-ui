import { ERROR } from 'ws_server/models/consts';
import { createHash } from 'crypto';

export function generateHash(value: string): string {
  const hash = createHash('sha256');
  try {
    return hash.update(value).digest('hex');
  } catch {
    throw new Error(`${ERROR.HASH}`);
  }
}
