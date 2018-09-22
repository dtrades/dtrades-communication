/**
 * Encrypt Message
 *
 * @param {string} private_key EOSIO Private Key
 * @param {string} public_key EOSIO Public Key
 * @param {string} message Message to Encrypt
 * @param {number} [maxsize=256] Maximum character message size
 * @returns {string} Encrypted Message
 * @example
 *
 * const encrypted = encrypt(private_key, public_key, message);
 */
export function encrypt(private_key: string, public_key: string, message: string, maxsize?: number): string;

/**
 * Decrypt Message
 *
 * @param {string} private_key EOSIO Private Key
 * @param {string} public_key EOSIO Public Key
 * @param {string} message Encrypted Message
 * @returns {string} Decrypted Message
 * @example
 *
 * const decrypted = decrypt(private_key, public_key, message);
 */
export function decrypt(private_key: string, public_key: string, message: string): string;
