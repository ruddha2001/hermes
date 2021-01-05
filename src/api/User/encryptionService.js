"use strict";
exports.__esModule = true;
exports.decrypt = void 0;
var crypto_1 = require("crypto");
var algorithm = "aes-256-cbc";
var key = "F85D4B42B0F987GH2S14G587WD7GRX98";
var encrypt = function (rawData) {
    var iv = crypto_1.randomBytes(16);
    var cipher = crypto_1.createCipheriv(algorithm, key, iv);
    var encrypted = cipher.update(rawData);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
};
var decrypt = function (encryptedData, incomingIv) {
    var iv = Buffer.from(incomingIv, "hex");
    var encryptedText = Buffer.from(encryptedData, "hex");
    var decipher = crypto_1.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};
exports.decrypt = decrypt;
console.log(encrypt("My name is Aniruddha"));
console.log(exports.decrypt("9479d997215daa5bc295002702c95fed491b7c314bba5a6c5187e7ff07f2896e", "6c462bfc8ac5e68b2beaa93283f16d1a"));
