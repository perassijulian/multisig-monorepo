import hre from "hardhat";
import MultiSigWallet from "../ignition/modules/MultiSigWallet";

async function main() {
  const numConfirmationsRequired = 3;
  const owners = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  ];

  const { multiSig } = await hre.ignition.deploy(MultiSigWallet, {
    parameters: { MultiSigWallet: { owners, numConfirmationsRequired } },
  });

  console.log(`MultiSig deployed to: ${await multiSig.getAddress()}`);
}

main().catch(console.error);
