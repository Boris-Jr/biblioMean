import mongoose from "mongoose";

const supplierSchemma = mongoose.Schema({
  name: String,
  address: String,
  registerDate: { type: Date, default: Date.now },
});

const supplier = mongoose.model("supplier", supplierSchemma);

export default supplier;
