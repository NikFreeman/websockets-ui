import crypto from 'crypto';
export function generateId() {
  const id = crypto.randomBytes(15).toString('hex');
  return id;
}
