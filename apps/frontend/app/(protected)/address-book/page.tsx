import AddressBookNavbar from "@/components/layout/AddressBookNavbar";
import Table from "@/components/UI/Table";

const TABLE_HEAD = ["Name", "Address", ""];
export default function AddressBook() {
  return (
    <section className="w-full">
      <AddressBookNavbar />
      <div className="p-6">
        <Table head={TABLE_HEAD} />
      </div>
    </section>
  );
}
