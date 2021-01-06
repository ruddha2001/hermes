import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
const algorithm = "aes-256-cbc";
const key = process.env.CRYPTO_KEY!;

export const encrypt = (rawData: string) => {
  let iv = randomBytes(20).toString("hex").slice(0, 16);
  let cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(rawData);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv, encryptedData: encrypted.toString("hex") };
};

export const decrypt = (encryptedData: string, incomingIv: string) => {
  let encryptedText = Buffer.from(encryptedData, "hex");
  let decipher = createDecipheriv("aes-256-cbc", Buffer.from(key), incomingIv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
