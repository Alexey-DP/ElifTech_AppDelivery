import mongoose from "mongoose";

const Companys = new mongoose.Schema({
    company: {type: String, required: true},
    logo: {type: String},
    products: {type: Array, required: true}
});

export default mongoose.model('Companys', Companys);