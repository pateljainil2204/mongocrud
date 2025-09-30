import express from "express";
import router from "../route/routes.js";

const expressConfig = async (app) => {
    app.use(express.json());
    app.use("/api" , router );
} ;

export default expressConfig;