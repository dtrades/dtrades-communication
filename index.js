function serialize(buff){

	var str = "TO DECRYPT: msg.eostitan.com\n";

	str += buff.nonce.low.toString().padStart(11, ".");
	str += buff.nonce.high.toString().padStart(11, ".");
	str += buff.checksum.toString().padStart(11, ".");
	str += buff.message.toString('base64');

	return str;

}

function deserialize(message){

	message = message.replace("TO DECRYPT: msg.eostitan.com\n", "");

	var low = parseInt(message.substring(0, 11).replace(/[.]/g, ""));
	var high = parseInt(message.substring(11, 22).replace(/[.]/g, ""));
	var checksum = parseInt(message.substring(22, 33).replace(/[.]/g, ""));
	var message = message.substring(33, message.length);

	var obj = {
		nonce: new Long(low, high, 0),
		checksum: checksum,
		content: Buffer.from(message, "base64")
	}

	return obj;

}

exports.encrypt = function(fromAcct, toAcct, message){
	let perm = acct.permissions.find(function(p){return p.perm_name=="active"});

	if (!perm) new Error(`Couldn't find active permission for account ${toAcct}`);
	if (perm.required_auth.threshold !=1) new Error(`Sending to multi-sig addresses is not currently supported.`);

	let pubKey = perm.required_auth.keys[0].key;

	let buff = eosecc.Aes.encrypt(key.priv_key, pubKey, message);

	var str = serialize(buff);

	if (str.length > 256) return new Error("error: message too long (max 256 chars)");
}

exports.decrypt = function(fromAcct, toAcct, message){
	let perm = acct.permissions.find(function(p){return p.perm_name=="active"});

	if (!perm) new Error(`Couldn't find active permission for account ${fromAcct}`);
	if (perm.required_auth.threshold !=1) new Error(`Receiving from multi-sig addresses is not currently supported.`);

	let pubKey = perm.required_auth.keys[0].key;

	var deserialized = deserialize(message);

	let decrypted = eosecc.Aes.decrypt(key.priv_key, pubKey, deserialized.nonce, deserialized.content, deserialized.checksum);

	return decrypted.toString('utf8');
}
