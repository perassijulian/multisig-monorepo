import OwnerList from "@/components/owners/OwnerList";
import TransactionForm from "@/components/transactions/TransactionForm";
import TransactionList from "@/components/transactions/TransactionList";

export default function Home() {
  return (
    <section>
      <TransactionForm />
      <OwnerList />
      <TransactionList />
    </section>
  );
}
