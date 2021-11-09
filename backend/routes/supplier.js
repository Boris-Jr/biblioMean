import express from "express";
import supplier from "../controller/supplier.js";

const router = express.Router();

router.post("/registerSupplier", supplier.registerSupplier);
router.get("/listSupplier", supplier.listSupplier);

export default router;
