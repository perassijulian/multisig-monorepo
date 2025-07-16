import { Router } from "express";
import multisigRoutes from "./multisigs.route";
import addressBook from "./address-book.route";

const router = Router();

router.use("/multisigs", multisigRoutes);
router.use("/address-book", addressBook);

export default router;
