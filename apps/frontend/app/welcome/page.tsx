import AccountCard from "@/components/accounts/AccountCard";
import AccountList from "@/components/accounts/AccountList";
import Button from "@/components/UI/Button";

export default function Welcome() {
  const accounts = [
    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  ];
  return (
    <section className="flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <div className="mt-8 flex flex justify-between items-center">
          <h2 className="font-bold text-3xl">Accounts</h2>
          <Button>Create wallet</Button>
        </div>
        <div className="bg-bgSubtle w-full p-4 mt-10 rounded shadow-xl">
          <div className="flex justify-between px-2">
            <div>search</div>
            <div>sort</div>
          </div>
          <div>
            <AccountList accounts={accounts} />
          </div>
        </div>
      </div>
    </section>
  );
}
