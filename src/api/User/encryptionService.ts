import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
const algorithm = "aes-256-cbc";
const key = process.env.CRYPTO_KEY!;

export const encrypt = (rawData: string) => {
  let iv = randomBytes(16);
  let cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(rawData);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
};

export const decrypt = (encryptedData: string, incomingIv: string) => {
  let iv = Buffer.from(incomingIv, "hex");
  let encryptedText = Buffer.from(encryptedData, "hex");
  let decipher = createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
