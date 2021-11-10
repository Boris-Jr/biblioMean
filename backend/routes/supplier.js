import express from "express";
import supplier from "../controller/supplier.js";

const router = express.Router();

router.post("/registerSupplier", supplier.registerSupplier);
router.get("/listSupplier", supplier.listSupplier);
router.get("/findSupplier/:_id", supplier.findSupplier);
router.delete("/deleteSupplier/:_id", supplier.deleteSupplier);
router.put("/updateSupplier", supplier.updateSupplier);

export default router;
