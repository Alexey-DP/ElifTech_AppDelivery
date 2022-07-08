import mongoose from "mongoose";

const Orders = new mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true},
    number: {type: String, required: true},
    address: {type: String},
    order: {type: Object, required: true},
    totalPrice: {type: String, required: true},
    date: {type: Date, required: true}
});

export default mongoose.model('Orders', Orders);