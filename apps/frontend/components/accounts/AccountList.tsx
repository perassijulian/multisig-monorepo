import AccountCard from "./AccountCard";

export default function AccountList({ accounts }: { accounts: string[] }) {
  return (
    <div>
      {accounts.map((account, i) => (
        <AccountCard key={i} keyTag={i} account={account} />
      ))}
    </div>
  );
}
