export type Contact = {
  name: string;
  address: `0x${string}`;
};

// returned from backend
export type ContactSchema = Contact & {
  createdAt: string; // ISO timestamp
  creatorId: string;
  id: string;
};
