import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import SecretService from "./Services/SecretService.js";
import SecretController from "./Controllers/SecretController.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

app.use(cors());
app.use(express.json());

const secretService = new SecretService();
const secretController = new SecretController(secretService);

app.get("/secret/:hash", (req, res) => secretController.viewSecret(req, res));
app.post("/secret/create", (req, res) => secretController.createSecret(req, res));
app.get("/secrets", (req, res) => secretController.listSecrets(req, res));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});