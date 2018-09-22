# EOS Communication

This library allows to encrypt messages on the EOS platform, using the AES shared key encryption algorithm.

Decryption is achieved by combining the receiver's private key and the sender's public key to create the private key necessary to decrypt the message.

This module uses `eosjs-ecc` to perform the required cryptographic operations.

## Install

**npm**

```
$ npm install --save eos-communication
```

## Usage

```js
import { encrypt, decrypt } from 'eos-communication';

const public_key = "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV";
const private_key = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";

const message = "Private Message, shhhh!";
const encrypted = encrypt(private_key, public_key, message);
// => TO DECRYPT: eos-communication
// .1167451677...23460624..862584768Q+h1AeLQbjfzZJD1Nsx6kk3U/jSNStwoWstz9uNCadw=

const decrypted = decrypt(private_key, public_key, encrypted);
// => Private Message, shhhh!
```

## API
