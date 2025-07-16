"use client";

import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";

const EMPTY_FORMDATA: { name: string; contact: `0x${string}` } = {
  name: "",
  contact: "0x" as `0x${string}`,
};

export default function CreateContact({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [formData, setFormData] = useState<{
    name: string;
    contact: `0x${string}`;
  }>(EMPTY_FORMDATA);

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    console.log(formData);
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
          name="contact"
          label="Contact"
          value={formData.contact}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <div className="flex items-center justify-between mt-6">
          <Button
            onClick={() => {
              setFormData(EMPTY_FORMDATA);
              closeModal();
            }}
            className="w-32"
            variant="secondary"
          >
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
