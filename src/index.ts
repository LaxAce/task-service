import express from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();
const app = express();
const port = process.env.PORT || 2024;

//middleware
app.use(express.json());


app.use("/api/v1", routes)

app.listen(port, () => console.log(`Listening on port ${port}!`));
