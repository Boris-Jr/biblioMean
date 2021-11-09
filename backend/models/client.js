import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    registerDate: {type: Date, default: Date.now},
    bdStatus: Boolean,
});

const client = mongoose.model("client", clientSchema);

export default client;