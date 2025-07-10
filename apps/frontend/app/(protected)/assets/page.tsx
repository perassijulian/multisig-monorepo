import AssetsNavbar from "@/components/layout/AssetsNavbar";
import ContractBalance from "@/components/multisig/ContractBalance";
import ClientTxWrapper from "@/components/transactions/ClientTxWrapper";

export default function Assets() {
  const wallets = ["wallet 1", "wallet 2", "wallet 3"];

  return (
    <section className="w-full">
      <AssetsNavbar wallets={wallets} />
      <div className="p-4 space-y-4">
        <ContractBalance />
        <ClientTxWrapper />
      </div>
    </section>
  );
}
