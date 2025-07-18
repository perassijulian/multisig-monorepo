"use client";

import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useToast } from "../context/ToastContext";
import { useAccount } from "wagmi";
import { postContactToAPI } from "@/lib/api/address-book";
import { useContactsStore } from "@/stores/useContactsStore";

const EMPTY_FORMDATA: { name: string; address: `0x${string}` } = {
  name: "",
  address: "0x" as `0x${string}`,
};

export default function CreateContact({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [formData, setFormData] = useState<{
    name: string;
    address: `0x${string}`;
  }>(EMPTY_FORMDATA);
  const { showToast } = useToast();
  const { address: creator } = useAccount();
  const { fetchContacts } = useContactsStore();

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const { name, address } = formData;
    if (!creator) {
      showToast({
        message: "Error while fetching your account, please reload page",
        type: "error",
      });
      return;
    }
    try {
      const res = await postContactToAPI({ name, address, creator });
      if (res && res.id) {
        showToast({
          message: "Contact created!",
          type: "success",
        });
        fetchContacts(creator);
        handleClose();
      }
    } catch (error) {
      showToast({
        message: "Error while creating contact, please try again",
        type: "error",
      });
      console.error(error);
    }
  };

  const handleClose = () => {
    setFormData(EMPTY_FORMDATA);
    closeModal();
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <Input
          name="address"
          label="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <div className="flex items-center justify-between mt-6">
          <Button onClick={handleClose} className="w-32" variant="secondary">
            Cancel
          </Button>
          <Button className="w-32" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
