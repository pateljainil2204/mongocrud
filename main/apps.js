import express from "express";
import "dotenv/config";
import connectdb from "../connection/db.js";
import expressConfig from "./config.js";

const app = express();
const PORT = process.env.PORT || 5000;

const main = async () => {
    try {
        await connectdb();
        await expressConfig(app);

        app.listen(PORT, () => {
            console.log(`server is running on PORT ${PORT}`);
        });
    } catch (error) {}
};

main();