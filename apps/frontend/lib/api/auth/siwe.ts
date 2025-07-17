import { SiweMessage } from "siwe";

export async function signInWithEthereum(
  address: string,
  chainId: number,
  signMessage: (msg: string) => Promise<string>
) {
  // 1. Get nonce
  const nonceRes = await fetch("/api/auth/nonce");
  const nonce = await nonceRes.text();

  // 2. Create siwe message
  const siweMessage = new SiweMessage({
    domain: window.location.host,
    address,
    statement: "Sign in with Ethereum to the app.",
    uri: window.location.origin,
    version: "1",
    chainId,
    nonce,
  });

  const messageToSign = siweMessage.prepareMessage();

  // 3. Sign message
  const signature = await signMessage(messageToSign);

  // 4. Send login request
  const loginRes = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: messageToSign, signature }),
  });

  if (!loginRes.ok) throw new Error("Login failed");

  return true;
}

export async function checkSession() {}
