import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import router from "./router.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 7777;
const DB_URL = `mongodb+srv://Alexey:12345@delivery.9u5jc.mongodb.net/?retryWrites=true&w=majority`;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

const startApp = async () => {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
        app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
    } catch(err) {
        console.log(err);
    }
};

startApp();