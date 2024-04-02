import { getAllUsersService } from "../services";
import express from "express";

const router = express.Router();

router.get("/users", getAllUsersService)

export default router;
