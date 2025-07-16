"use client";

import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";

export default function CreateContact() {
  const [formData, setFormData] = useState<{
    name: string;
    contact: `0x${string}`;
  }>({ name: "", contact: "0x" });

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
          <Button className="w-32" variant="secondary">
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
