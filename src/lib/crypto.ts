'use server';

import { gcm } from '@noble/ciphers/aes';
import { utf8ToBytes, bytesToUtf8, bytesToHex, hexToBytes, concatBytes } from '@noble/ciphers/utils';
import { pbkdf2Sync } from 'crypto';

const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_NONCE = String(process.env.SECRET_NONCE);

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not set in environment variables');
}

function deriveKey(secret: string, bytes: number): Uint8Array {
  const salt = 'llamout_salt';
  const derivedKey = pbkdf2Sync(secret, salt, 100000, bytes, 'sha256');

  return new Uint8Array(derivedKey);
}

const key = deriveKey(SECRET_KEY, 32);
const nonce = deriveKey(SECRET_NONCE, 12);

export async function encrypt(data: string): Promise<string> {
  const _data = utf8ToBytes(data);

  const aes = gcm(key, nonce);
  const ciphertext = aes.encrypt(_data);

  const result = concatBytes(ciphertext, nonce);

  return bytesToHex(result);
}

export async function decrypt(data: string): Promise<string> {
  const _data = hexToBytes(data);

  const ciphertext = _data.subarray(0);
  const nonce = _data.subarray(0, -12);

  const aes = gcm(key, nonce);
  const plaintext = aes.decrypt(ciphertext);

  return bytesToUtf8(plaintext);
}
