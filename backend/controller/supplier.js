import supplier from "../models/supplier.js";

const registerSupplier = async (req, res) => {
  if (!req.body.name || !req.body.address)
    return res.status(400).send("Incomplete data");

  const existingSupplier = await supplier.findOne({ name: req.body.name });
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

const findSupplier = async (req, res) => {
  const supplierId = await supplier.findOne({ _id: req.params["_id"] });
  if (!supplierId) return res.status(400).send("Supplier not found");
  return res.status(200).send({ supplierId });
};

const updateSupplier = async (req, res) => {
  if (!req.body.name || !req.body.address)
    return res.status(400).send("Incomplete data");

  const existingSupplier = await supplier.findOne({
    name: req.body.name,
    address: req.body.address,
  });
  if (existingSupplier)
    return res.status(400).send("Supplier already existing");

  const supplierUpdate = await supplier.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    address: req.body.address,
  });
  if (!supplierUpdate) return res.status(400).send("Failed update");
  return res.status(200).send({ supplierUpdate });
};

const deleteSupplier = async (req, res) => {
  const supplierDelete = await supplier.findByIdAndDelete({ _id: req.params["_id"] });
  
  if (!supplierDelete) return res.status(400).send("Failed delete");
  return res.status(200).send("Supplier deleted")
};

export default { registerSupplier, listSupplier, findSupplier, deleteSupplier, updateSupplier };
