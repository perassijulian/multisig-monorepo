import AssetsNavbar from "@/components/layout/AssetsNavbar";
import ContractBalance from "@/components/multisig/ContractBalance";
import OwnerList from "@/components/owners/OwnerList";
import TransactionForm from "@/components/transactions/TransactionForm";
import TransactionList from "@/components/transactions/TransactionList";

export default function Assets() {
  const wallets = ["wallet 1", "wallet 2", "wallet 3"];

  return (
    <section className="w-full">
      <AssetsNavbar wallets={wallets} />
      <div className="p-4 space-y-4">
        <ContractBalance />
        <div className="flex gap-4">
          <OwnerList />
          <TransactionForm />
          <TransactionList />
        </div>
      </div>
    </section>
  );
}
