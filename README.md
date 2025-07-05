# 🛡️ MultiSig Wallet DApp

A secure, modular, and user-friendly MultiSig wallet built on Ethereum. Designed to empower groups of individuals or organizations to collectively manage assets and execute transactions with shared control.

---

## 🎯 Project Vision

Our goal is to create a clean, extendable, and production-ready MultiSig wallet that:

- Allows groups to manage shared funds securely
- Makes multi-approval governance simple and transparent
- Serves as a foundation for future extensions: modules, voting, timelocks, social recovery, and more

This project is inspired by the excellent UX and architecture of [Safe](https://safe.global/), with our own minimalist take on both backend and frontend.

---

## 🧩 Core Features (MVP)

- 🔐 MultiSig logic with customizable owners and confirmations
- 📝 Transaction submission (to, value, data)
- 👥 Per-owner confirmation and revocation
- 🚀 Transaction execution after threshold
- 💬 Event-based frontend feedback
- 🧪 Complete test suite with Hardhat and Chai

---

## 🛠️ Stack

| Layer          | Tools                                  |
| -------------- | -------------------------------------- |
| Smart Contract | Solidity (v0.8.26), Hardhat            |
| Frontend       | Next.js, TailwindCSS, Shadcn/UI        |
| Web3 Layer     | wagmi v1 + viem (Ethers v6 compatible) |
| Testing        | Mocha, Chai, Hardhat Network           |
| Wallets        | Metamask / WalletConnect               |

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/perassijulian/multisig-monorepo.git
cd multisig-monorepo

# Install dependencies
pnpm install

# Open contracts folder
cd packages/contracts

# Run local node
pnpm hardhat node

# Deploy contracts
npx hardhat ignition deploy ./ignition/modules/MultiSigWallet.ts --network localhost

# Run tests
npx hardhat test test/MultiSigWallet.ts
```

---

## 💻 UI Roadmap

- Wallet connect
- List owners
- Submit transaction (address, value, data)
- Confirm / revoke transaction
- Execute transaction after approvals
- Deploy new MultiSig with custom owners
- Show all wallets created by the user
- Mobile-friendly UI polish

---

📚 For Recruiters

This project showcases:

- Strong understanding of smart contract architecture and security (non-reentrancy, access control, confirmations)
- Full testing coverage and edge case handling
- Modern frontend tech stack (React + wagmi + Tailwind)
- Clean, scalable codebase ready for production

I’m excited to contribute to teams working on crypto wallets, protocol interfaces, DAOs, and any tools that push the ecosystem forward.

---

## 🤝 Contributing

We welcome collaborators who care about clean code, good architecture, and decentralization.

To get started:

- Fork the repo
- Create your feature branch (git checkout -b feat/your-feature)
- Commit your changes (git commit -am 'Add feature')
- Push to the branch (git push origin feat/your-feature)
- Open a pull request 🚀

---

🧭 Future Features (Post-MVP)

- 🧱 Smart contract factory for custom wallet deployment
- 🧠 Social recovery / guardians
- 📆 Transaction scheduling and timelocks
- 📊 Gas optimization pass
- 🔐 On-chain access control modules
- 🌐 Deployment to public testnet + ENS name
- 📝 Documentation site + contract verification

---

⚖️ License

MIT — use it, fork it, break it, build it better.

---

🧑‍💻 Authors

Julian Perassi
[LinkedIn](https://www.linkedin.com/in/julian-perassi-7336ab97/) • [Portfolio](https://perassi.vercel.app/)
