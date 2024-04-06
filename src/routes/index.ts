import express from "express";
import {
   getAllUsersService,
   getUserBoards
}
   from "../services";

const router = express.Router();

router.get("/:user_id/boards", getUserBoards)

router.get("/users", getAllUsersService)

export default router;
