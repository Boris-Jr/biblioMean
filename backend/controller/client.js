import client from "../models/client.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import bcrypt from "bcrypt";

const registerClient = async (req, res) => {
  if (!req.body.name || !req.body.email)
    return res.status(400).send("Incomplete data");

  const existingClient = await client.findOne({ email: req.body.email });
  if (existingClient) return res.status(400).send("client already existing");

  let pass = "";

  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    pass = existingClient.password;
  }

  const clientSchema = new client({
    name: req.body.name,
    email: req.body.email,
    password: pass,
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

const updateClient = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete data");

  const existingClient = await client.findOne({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  if (existingClient) return res.status(400).send("Client already existing");

  const clientUpdate = await client.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  if (!clientUpdate) return res.status(400).send("Error at editing client");
  return res.status(200).send({ clientUpdate });
};

const deleteClient = async (req, res) => {
  const clientdelete = await client.findByIdAndDelete({
    _id: req.params["_id"],
  });
  if (!clientdelete) return res.status(400).send("Failed deleted");
  return res.status(200).send("Client deleted");
};
const findClient = async (req, res) => {
  const clientID = await client.findById({ _id: req.params["_id"] });
  if (!clientID) return res.status(400).send("Not found");
  return res.status(200).send({ clientID });
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send("Incomplete data");

  const userLogin = await client.findOne({ email: req.body.email });
  if (!userLogin) return res.status(400).send("Wrong email or password");

  const hash = await bcrypt.compare(req.body.password, userLogin.password);

  if (!hash) return res.status(400).send("Wrong email or password");

  try {
    return res.status(400).json({
      token: jwt.sign(
        {
          _id: userLogin._id,
          name: userLogin.name,
          email: userLogin.email,
          password: userLogin.password,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "Failed internal at login" });
  }
};

export default {
  registerClient,
  listClient,
  updateClient,
  findClient,
  deleteClient,
  login,
};
