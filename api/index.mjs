import express from "express"
import cors from "cors"
import router from "../routes/index.mjs";
import db from "../config/db.mjs"

const app = express();


app.use(cors());
app.use(express.json());
app.use('/', router);

// db connection
db.connection
    .once("open", () => console.log("Connected to DB"))
    .on("Error", (err) => console.log("Error connecting to DB ==>", err));

export default app;
