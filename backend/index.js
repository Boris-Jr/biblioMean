import cors from "cors";
import express from "express";
import db from "./db/db.js";
import dotenv from "dotenv";
import book from "./routes/book.js";
import client from "./routes/client.js";
import supplier from "./routes/supplier.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/book", book);
app.use("/api/client", client);
app.use("/api/supplier", supplier);

app.listen(process.env.PORT, () =>
  console.log("The port running is: " + process.env.PORT)
);

db.connDB();