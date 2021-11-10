import express from "express";
import book from "../controller/book.js";

const router = express.Router();

router.post("/registerBook", book.registerBook);
router.get("/listBook", book.listBook);
router.get("/findBook/:_id", book.findBook);
router.put("/updateBook", book.updateBook);
router.delete("/deleteBook/:_id", book.deleteBook);


export default router;