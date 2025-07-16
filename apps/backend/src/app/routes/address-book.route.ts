import { NextFunction, Request, Response, Router } from "express";
import {
  CreateNewContactSchema,
  GetAddressBookSchema,
} from "../validators/address-book";
import { getContacts } from "../../domain/address-book/services/getContacts";
import { Address } from "../../types";
import { createNewContact } from "../../domain/address-book/services/createNewContact";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const parsedParams = GetAddressBookSchema.safeParse(req.query);
  if (!parsedParams.success || !parsedParams.data) {
    next(parsedParams.error);
    return;
  }
  const { wallet } = parsedParams.data;

  try {
    const contacts = await getContacts(wallet as Address);
    return res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const parsedParams = CreateNewContactSchema.safeParse(req.body);
  if (!parsedParams.success || !parsedParams.data) {
    next(parsedParams.error);
    return;
  }

  const { name, address, creator } = parsedParams.data;

  try {
    const contact = await createNewContact({ name, address, creator });
    return res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
});

export default router;
