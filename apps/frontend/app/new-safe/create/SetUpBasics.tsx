"use client";

import Input from "@/components/UI/Input";

type FormDataType = {
  name: string;
  chain: string;
};

interface SetUpBasicsType {
  formData: FormDataType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SetUpBasics({
  formData,
  handleChange,
}: SetUpBasicsType) {
  return (
    <div>
      <div className="flex items-center">
        <div>1</div>
        <div>
          <h3>Set up the basics</h3>
          <p>
            Give a name to your account and select which networks to deploy it
            on
          </p>
        </div>
      </div>
      <div>
        <Input
          label="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label="Network you want to deploy"
          name="chain"
          value={formData.chain}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
