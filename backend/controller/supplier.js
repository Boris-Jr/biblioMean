import supplier from "../models/supplier.js";

const registerSupplier = async (req, res) => {
  if (!req.body.name || !req.body.address)
    return res.status(400).send("Incomplete data");

  const existingSupplier = await supplier.findOne({ name: req.body.namw });
  if (existingSupplier)
    return res.status(400).send("Supplier already existing");

  const supplierSchema = new supplier({
    name: req.body.name,
    address: req.body.address,
  });

  const result = await supplierSchema.save();

  if (!result) return res.status(400).send("Error in process to save data");

  return res.status(200).send({ result });
};

const listSupplier = async (req, res) => {
  const supplierchema = await supplier.find();
  if (!supplierchema || supplierchema.length == 0)
    return res.status(400).send("Empty supplier list");
  return res.status(200).send({ supplierchema });
};

export default { registerSupplier, listSupplier };
