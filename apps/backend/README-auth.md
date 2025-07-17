# 🦊 Ethereum SIWE Auth Backend

This backend implements **Sign-In With Ethereum (SIWE)** authentication using Express and `express-session`. It allows users to authenticate securely with their Ethereum wallet (e.g. MetaMask) without traditional username/password.

This setup is modern, secure, and showcases a real-world web3 login system that can be used for gated routes, dashboards, and identity-based features.

---

## 🔐 Auth Flow: Sign-In With Ethereum

1. ### `GET /api/siwe/nonce`

   The frontend requests a nonce to begin the login process. This nonce is stored in the user's session and helps prevent replay attacks.

2. ### Client signs the nonce

   The user is prompted to sign a SIWE-compliant message (e.g., using MetaMask). This message includes:

   - Domain
   - Wallet address
   - Nonce
   - Expiration time
   - Purpose of the login

3. ### `POST /api/siwe/login`

   The client sends the signed message and signature to the backend. The server verifies:

   - The signature is valid
   - The nonce matches
   - The message is well-formed

   If verified, the server:

   - Stores the user's Ethereum address in `req.session.siwe`
   - Sets the session expiration based on the SIWE message

4. ### 🎟️ Session is now active

   All subsequent requests include a session cookie. This cookie authenticates the user on the server and allows access to protected routes.

5. ### `GET /api/siwe/me`

   The frontend checks if the user is authenticated by verifying their session. This is used after page reloads or new visits to sync frontend state with the backend.

   Returns:

   ```json
   {
     "authenticated": true,
     "address": "0x123...abc"
   }
   ```

---

## 🔄 Session Details

- Uses `express-session` to manage login state.
- Sessions are stored in memory by default. For production use, consider Redis or another session store.
- Cookies are sent with `credentials: include` on the frontend.

---

## 🛡️ Security Notes

- Nonce is regenerated per login attempt and cleared after use.
- Signing is required for every login, no silent re-auth.
- No passwords or email used — wallet is the identity layer.

---

## 📁 Routes Overview

| Method | Endpoint          | Description                      |
| ------ | ----------------- | -------------------------------- |
| GET    | `/api/siwe/nonce` | Generate a unique nonce          |
| POST   | `/api/siwe/login` | Verify SIWE message + signature  |
| GET    | `/api/siwe/me`    | Check session + get user address |

---

## 💡 Why SIWE?

Using SIWE instead of traditional login offers:

- No password breaches
- Zero onboarding friction for web3 users
- Cryptographic security tied to blockchain identity

---

## ✨ Future Improvements

- Add route protection middleware for secure endpoints
- Implement logout endpoint (`/api/siwe/logout`)
- Use Redis or DB session store
- Support EIP-4361 expiration/nonce invalidation strategies

---

Built to reflect modern web3 practices (2026 and beyond).

```

```
