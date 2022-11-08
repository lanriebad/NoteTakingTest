const ENCRYPT_SECRET_KEY = 'NoteTaking12345#';

const CryptoJS = require('crypto-js');

const encodedSecretKey = btoa(ENCRYPT_SECRET_KEY);
const parsedBase64Key = CryptoJS.enc.Base64.parse(encodedSecretKey);

export const encryptText = (text: string): string => {
  return CryptoJS.AES.encrypt(text, parsedBase64Key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString();
};

export const decryptText = (text: string) => {
  return CryptoJS.AES.decrypt(text, parsedBase64Key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8);
};
