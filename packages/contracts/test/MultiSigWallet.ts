import { expect } from "chai";
import hre from "hardhat";

describe("MultiSigWallet", function () {
  let multiSigWallet: any;
  let signers: any[];
  let ownerSigners: any[];
  let notOwner: any;
  let ownerAddresses: any[];

  const numConfirmationsRequired = 2;
  const ownersQuantity = 4;

  const randomAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
  const randomEthQuantity = hre.ethers.parseEther("0.00001");

  beforeEach(async function () {
    signers = await hre.ethers.getSigners();

    ownerSigners = signers.slice(0, ownersQuantity);
    ownerAddresses = ownerSigners.map((s) => s.address);
    notOwner = signers[ownersQuantity + 1];

    multiSigWallet = await hre.ethers.deployContract("MultiSigWallet", [
      ownerAddresses,
      numConfirmationsRequired,
    ]);
  });

  it("Should set the right owner wallets", async function () {
    expect(await multiSigWallet.getOwners()).to.deep.equal(ownerAddresses);
  });

  it("Should allow owner to submitTransaction", async function () {
    await expect(
      multiSigWallet
        .connect(ownerSigners[0])
        .submitTransaction(randomAddress, randomEthQuantity, "0x")
    )
      .to.emit(multiSigWallet, "SubmitTransaction")
      .withArgs(ownerAddresses[0], 0, randomAddress, randomEthQuantity, "0x");
  });

  it("Should revert with the right error if a not owner tries to submitTransaction", async function () {
    await expect(
      multiSigWallet
        .connect(notOwner)
        .submitTransaction(randomAddress, randomEthQuantity, "0x")
    ).to.be.revertedWith("not owner");
  });

  it("Should emit Deposit event when ETH is sent", async function () {
    const contractAddress = await multiSigWallet.getAddress();
    await expect(
      ownerSigners[0].sendTransaction({
        to: contractAddress,
        value: randomEthQuantity,
      })
    )
      .to.emit(multiSigWallet, "Deposit")
      .withArgs(ownerAddresses[0], randomEthQuantity, randomEthQuantity);
  });

  it("Should allow multiple owners to confirm a tx", async function () {
    await multiSigWallet
      .connect(ownerSigners[0])
      .submitTransaction(randomAddress, randomEthQuantity, "0x");

    await expect(multiSigWallet.connect(ownerSigners[1]).confirmTransaction(0))
      .to.emit(multiSigWallet, "ConfirmTransaction")
      .withArgs(ownerAddresses[1], 0);

    const tx = await multiSigWallet.connect(ownerSigners[1]).getTransaction(0);
    expect(tx.numConfirmations).to.deep.equal(1);
  });

  it("Should not allow double confirmation by the same owner", async function () {
    await multiSigWallet
      .connect(ownerSigners[0])
      .submitTransaction(randomAddress, randomEthQuantity, "0x");

    await multiSigWallet.connect(ownerSigners[1]).confirmTransaction(0);

    await expect(
      multiSigWallet.connect(ownerSigners[1]).confirmTransaction(0)
    ).to.revertedWith("tx already confirmed");
  });

  it("Should execute a transaction only after required confirmations", async function () {
    const contractAddress = await multiSigWallet.getAddress();
    await ownerSigners[0].sendTransaction({
      value: randomEthQuantity,
      to: contractAddress,
    });

    await multiSigWallet
      .connect(ownerSigners[0])
      .submitTransaction(ownerAddresses[2], randomEthQuantity, "0x");

    for (let i = 0; i < numConfirmationsRequired; i++) {
      await multiSigWallet.connect(ownerSigners[i]).confirmTransaction(0);
    }

    const balanceBefore = await hre.ethers.provider.getBalance(
      ownerAddresses[2]
    );

    await expect(multiSigWallet.connect(ownerSigners[0]).executeTransaction(0))
      .to.emit(multiSigWallet, "ExecuteTransaction")
      .withArgs(ownerAddresses[0], 0);

    const balanceAfter = await hre.ethers.provider.getBalance(
      ownerAddresses[2]
    );
    expect(balanceAfter - balanceBefore).to.equal(randomEthQuantity);

    const tx = await multiSigWallet.connect(ownerSigners[1]).getTransaction(0);
    expect(tx.executed).to.deep.equal(true);
  });

  it("Should allow revoking confirmation and prevent execution", async function () {
    const contractAddress = await multiSigWallet.getAddress();
    await ownerSigners[0].sendTransaction({
      value: randomEthQuantity,
      to: contractAddress,
    });

    await multiSigWallet
      .connect(ownerSigners[0])
      .submitTransaction(ownerAddresses[2], randomEthQuantity, "0x");

    for (let i = 0; i < numConfirmationsRequired; i++) {
      await multiSigWallet.connect(ownerSigners[i]).confirmTransaction(0);
    }

    await expect(multiSigWallet.connect(ownerSigners[1]).revokeConfirmation(0))
      .to.emit(multiSigWallet, "RevokeConfirmation")
      .withArgs(ownerAddresses[1], 0);

    await expect(
      multiSigWallet.connect(ownerSigners[0]).executeTransaction(0)
    ).to.revertedWith("cannot execute tx");
  });
});
