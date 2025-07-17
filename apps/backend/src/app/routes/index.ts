import { Router } from "express";

import multisigRoutes from "./multisigs.route";
import addressBookRoutes from "./address-book.route";
import siweRoutes from "./siwe.route";

const router = Router();

router.use("/multisigs", multisigRoutes);
router.use("/address-book", addressBookRoutes);
router.use("/siwe", siweRoutes);

export default router;
