import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MultiSigWallet", (m) => {
  const owners = m.getParameter("owners");
  const numConfirmationsRequired = m.getParameter("numConfirmationsRequired");

  const multiSig = m.contract("MultiSigWallet", [
    owners,
    numConfirmationsRequired,
  ]);

  return { multiSig };
});
