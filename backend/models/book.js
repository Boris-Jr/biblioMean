import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  name: String,
  author: String,
  yearPublication: String,
  registerDate: { type: Date, default: Date.now },
  pages: String,
  gender: String,
  price: Number,
});

const book = mongoose.model("book", bookSchema);

export default book;
