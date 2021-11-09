import book from "../models/book.js";

const registerBook = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.author ||
    !req.body.yearPublication ||
    !req.body.pages ||
    !req.body.gender ||
    !req.body.price
  ) {
    return res.status(400).send("Incomplete data");
  }

  const existingRole = await book.findOne({ name: req.body.name });
  if (existingRole) return res.status(400).send("Book already existing");

  const bookSchema = new book({
    name: req.body.name,
    author: req.body.author,
    yearPublication: req.body.yearPublication,
    pages: req.body.pages,
    gender: req.body.gender,
    price: req.body.price,
  });

  const result = await bookSchema.save();
  if (!result) return res.status(400).send("Error in process to save data");

  return res.status(200).send({ result });
};

const listBook = async (req, res) => {
  const bookSchema = await book.find();
  if (!bookSchema || bookSchema.length == 0)
    return res.status(400).send("Empty book list");
  return res.status(200).send({ bookSchema });
};

export default { registerBook, listBook };
