import { randomBytes } from 'crypto';

const STYLE_HEADER =
  "font-weight:700;min-height: 10px;left: 0px;top: 40px;font-family: 'Lato';font-style: normal;font-size: 20px;line-height: 24px;font-feature-settings: 'pnum'on, 'lnum'on;color: #26272A;align-self: stretch;";
const CONTENT =
  "min-height: 10px;left: 0px;top: 40px;font-family: 'Lato';font-style: normal;font-size: 20px;line-height: 24px;font-feature-settings: 'pnum'on, 'lnum'on;color: #26272A;flex: none;order: 1;align-self: stretch;flex-grow: 0;";
const CONTENT16 =
  "min-height: 10px;left: 0px;top: 40px;font-family: 'Lato';font-style: normal;font-size: 16px;line-height: 24px;font-feature-settings: 'pnum'on, 'lnum'on;color: #26272A;flex: none;order: 1;align-self: stretch;flex-grow: 0;";
const CONTENT16BOLD =
  "min-height: 10px;left: 0px;top: 40px;font-family: 'Lato';font-style: normal;font-size: 16px;line-height: 24px;font-feature-settings: 'pnum'on, 'lnum'on;color: #26272A;flex: none;order: 1;align-self: stretch;flex-grow: 0;font-weight: 700;";
const PLACEHOLDER =
  "font-family: 'Lato';font-style: normal;font-weight: 400;font-size: 14px;line-height: 24px;color: rgba(38, 39, 42, 0.5);";

export function CreateRandomNumber(pjg: number): string {
  const random_number = parseInt(randomBytes(4).toString('hex'), 16).toString();
  if (pjg == 4) {
    return random_number.substring(random_number.length - 4);
  }
  return random_number.substring(random_number.length - 6);
}

export const wordingOtpFormatForEmail = (
  email: string,
  otp: string,
): string => {
  const message = `Hai, ${
    email || 'User'
  }!<br><br>Kode OTP Anda adalah: ${otp}.<br>JANGAN BAGIKAN KODE TERSEBUT KE SIAPAPUN termasuk VNT NETWORK.<br>WASPADA PENIPUAN!`;
  return message;
};

export const wordingOtpFormatForSms = (email: string, otp: string): string => {
  const message = `Hai, ${
    email || 'User'
  }!\n\nKode OTP Anda adalah: ${otp}.\nJANGAN BAGIKAN KODE TERSEBUT KE SIAPAPUN termasuk VNT NETWORK.\nWASPADA PENIPUAN!`;
  return message;
};

export const generateEmailUrlVerification = async (
  name: string,
  link: string,
): Promise<string> => {
  // const fbLink = new FirebaseDynamicLinks(process.env.FIREBASE_API_KEY);
  // const { shortLink } = await fbLink.createLink({
  //   dynamicLinkInfo: {
  //     domainUriPrefix: 'https://web.inovatif78.com',
  //     link,
  //   },
  // });

  const message = `
  <p style="${STYLE_HEADER}">Hai, ${name || 'User'}!</p>
  <p style="${CONTENT}"> Untuk verifikasi Email Anda klik link berikut: <a href="${link}">${link}</a> . </p>
  <p style="${CONTENT}"> JANGAN BAGIKAN LINK TERSEBUT KE SIAPAPUN termasuk VNT NETWORK. <br>
  WASPADA PENIPUAN! </p>`;
  return message;
};
