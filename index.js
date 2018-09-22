const { Aes } = require("eosjs-ecc");
const { Long } = require('bytebuffer');

/**
 * Serialize
 *
 * @private
 * @param {Crypt} buff Aes.encrypt => Object
 * @returns {string} Serialized String
 * @example
 *
 * const buff = Aes.encrypt(private_key, public_key, message);
 * const str = serialize(buff);
 */
function serialize(buff) {
    let str = "TO DECRYPT: eos-communication\n";

	str += buff.nonce.low.toString().padStart(11, ".");
	str += buff.nonce.high.toString().padStart(11, ".");
    str += buff.checksum.toString().padStart(11, ".");
	str += buff.message.toString('base64');

	return str;
}

/**
 * Deserialize
 *
 * @private
 * @param {string} message Message
 * @returns {Object} Deserialize Object
 * @example
 *
 * const { nonce, content, checksum } = deserialize(message);
 * const decrypted = Aes.decrypt(private_key, public_key, nonce, content, checksum);
 */
function deserialize(message) {
    message = message.replace("TO DECRYPT: eos-communication\n", "");

    const low = parseInt(message.substring(0, 11).replace(/[.]/g, ""));
    const high = parseInt(message.substring(11, 22).replace(/[.]/g, ""));
    const checksum = parseInt(message.substring(22, 33).replace(/[.]/g, ""));
    message = message.substring(33, message.length);

    return {
        nonce: new Long(low, high, 0),
        checksum,
        content: Buffer.from(message, "base64")
    };
}

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
function encrypt(private_key, public_key, message, maxsize = 256) {
    const buff = Aes.encrypt(private_key, public_key, message);
    const str = serialize(buff);

    if (maxsize !== -1 && str.length > maxsize) throw new Error(`error: message too long (max ${maxsize} chars)`);

    return str;
}

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
function decrypt(private_key, public_key, message) {
    const { nonce, content, checksum } = deserialize(message);
    const decrypted = Aes.decrypt(private_key, public_key, nonce, content, checksum);

    return decrypted.toString('utf8');
}

module.exports = {
    decrypt,
    encrypt,
}
