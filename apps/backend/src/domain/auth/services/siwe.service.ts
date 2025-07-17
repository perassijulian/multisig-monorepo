import { generateNonce, SiweMessage } from "siwe";
import { Request } from "express";

/**
 * Generates a new SIWE nonce and stores it in the session.
 */
export function createSiweNonce(req: Request): string {
  const nonce = generateNonce();
  req.session.nonce = nonce;
  return nonce;
}

/**
 * Verifies the SIWE login and sets the authenticated message in session.
 * Throws if message or signature is invalid.
 */
export async function verifySiweLogin(req: Request): Promise<void> {
  const { message: rawMessage, signature } = req.body;

  if (!rawMessage || !signature) {
    throw new Error("Missing message or signature");
  }

  const siweMessage = new SiweMessage(rawMessage);

  let message;
  try {
    const { data } = await siweMessage.verify({
      signature,
      nonce: req.session.nonce,
    });
    message = data;
  } catch (err) {
    throw new Error("Invalid SIWE signature or nonce");
  }

  req.session.siwe = message;

  if (message.expirationTime) {
    req.session.cookie.expires = new Date(message.expirationTime);
  }
}
