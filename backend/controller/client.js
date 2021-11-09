import client from "../models/client.js";

const registerClient = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete data");

  const existingClient = await client.findOne({ email: req.body.email });
  if (existingClient) return res.status(400).send("User already existing");

  const clientSchema = new client({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    bdStatus: true,
  });

  const result = await clientSchema.save();

  if (!result) return res.status(400).send("Error in process to save data");

  return res.status(200).send({ result });
};

const listClient = async (req, res) => {
  const clientSchema = await client.find();
  if (!clientSchema || clientSchema.length == 0)
    return res.status(400).send("Empty client list");
  return res.status(200).send({ clientSchema });
};

export default { registerClient, listClient };
