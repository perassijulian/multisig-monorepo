"use client";

import { useEffect } from "react";
import Table from "../UI/Table";
import { useAccount } from "wagmi";
import { useToast } from "../context/ToastContext";
import ContactActions from "./ContactActions";
import { useContactsStore } from "@/stores/useContactsStore";

const TABLE_HEAD = ["Name", "Address", ""];

export default function ContactsList() {
  const { contacts, fetchContacts, isLoading, error } = useContactsStore();
  const { address: wallet } = useAccount();
  const { showToast } = useToast();

  useEffect(() => {
    if (wallet) fetchContacts(wallet);
  }, [wallet]);

  if (isLoading) {
    return <Table head={TABLE_HEAD} isLoading />;
  }

  if (error) {
    showToast({
      message: "Something happened. Please reload the page",
      type: "error",
    });
    console.error(error);
    return (
      <Table
        head={TABLE_HEAD}
        errorMessage="Something happened. Please reload the page"
      />
    );
  }

  const body = contacts.map((contact) => [
    contact.name,
    contact.address,
    <ContactActions />,
  ]);

  return <Table head={TABLE_HEAD} body={body} />;
}
