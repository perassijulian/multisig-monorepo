import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.json({ message: "List of multisig wallets will be here" });
});

export default router;
