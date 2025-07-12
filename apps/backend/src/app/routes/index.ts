import { Router } from "express";
import multisigRoutes from "./multisigs.route";

const router = Router();

router.use("/multisigs", multisigRoutes);

export default router;
