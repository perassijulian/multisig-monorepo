import ContactsList from "@/components/addressBook/ContactsList";
import AddressBookNavbar from "@/components/layout/AddressBookNavbar";

export default function AddressBook() {
  return (
    <section className="w-full">
      <AddressBookNavbar />
      <div className="p-6">
        <ContactsList />
      </div>
    </section>
  );
}
