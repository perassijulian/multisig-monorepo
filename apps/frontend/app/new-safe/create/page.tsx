import CreateWalletForm from "./CreateWalletForm";

export default function Create() {
  return (
    <section className="flex flex-col items-center">
      <div className="max-w-5xl w-full mt-8">
        <h2 className="font-bold text-4xl mb-4">Create new Multisig Wallet</h2>
        <CreateWalletForm />
      </div>
    </section>
  );
}
