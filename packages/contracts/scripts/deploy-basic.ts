import { ethers } from "hardhat";
import path from "path";
import { exportContractToFrontend } from "./exportABI";

async function main() {
  const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");

  const contract = await MultiSigWallet.deploy(
    [
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    ],
    2
  );

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("✅ Deployed to:", address);

  exportContractToFrontend({
    name: "multiSig",
    address,
    artifactPath: path.join(
      __dirname,
      "../ignition/deployments/chain-31337/artifacts/MultisigWallet#MultiSigWallet.json"
    ),
    outputPath: path.join(
      __dirname,
      "../../../apps/frontend/lib/contracts/multisig.ts"
    ),
  });
}

main().catch(console.error);
