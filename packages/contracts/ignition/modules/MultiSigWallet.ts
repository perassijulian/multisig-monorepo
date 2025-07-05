import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MultiSigWallet", (m) => {
  const owners = m.getParameter("owners", [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  ]);
  const numConfirmationsRequired = m.getParameter(
    "numConfirmationsRequired",
    2
  );
  const multiSig = m.contract("MultiSigWallet", [
    owners,
    numConfirmationsRequired,
  ]);

  return { multiSig };
});
