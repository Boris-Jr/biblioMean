import express from "express";
import client from "../controller/client.js";

const router = express.Router();

router.post("/registerClient", client.registerClient);
router.get("/listClient", client.listClient);

export default router;