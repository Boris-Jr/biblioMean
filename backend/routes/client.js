import express from "express";
import client from "../controller/client.js";

const router = express.Router();

router.post("/registerClient", client.registerClient);
router.get("/listClient", client.listClient);
router.get("/findClient/:_id", client.findClient);
router.put("/updateClient", client.updateClient);
router.delete("/deleteClient/:_id", client.deleteClient);

export default router;