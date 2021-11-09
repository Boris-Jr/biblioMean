import mongoose from "mongoose";

const connDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect to DB successful");
  } catch (e) {
    console.log("Connect to DB failed" + e);
  }
};

export default { connDB };
