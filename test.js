const { encrypt, decrypt } = require('.');
const test = require('tape');

// variables
const public_key = "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV";
const private_key = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";
const message = "Private Message, shhhh!";
const message_long = `Very long message XXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`;

test(t => {
    const encrypted = encrypt(private_key, public_key, message);
    const decrypted = decrypt(private_key, public_key, encrypted);

    t.equal(decrypted, message);

    // Handle errors
    t.assert(encrypt(private_key, public_key, message_long, -1));
    t.throws(() => encrypt(private_key, public_key, message_long), "message too long (max 256 chars)");
    t.throws(() => encrypt(private_key, public_key, message, 5), "message too long (max 5 chars)")
    t.end();
});
