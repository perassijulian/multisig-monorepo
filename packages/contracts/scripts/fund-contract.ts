import { ethers } from "hardhat";

async function fundContract() {
  const [owner] = await ethers.getSigners();
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const tx = await owner.sendTransaction({
    to: contractAddress,
    value: ethers.parseEther("1000"),
  });

  await tx.wait();
  console.log(`Contract funded with 1000 ETH! ✅`);
}

fundContract().catch(console.error);
