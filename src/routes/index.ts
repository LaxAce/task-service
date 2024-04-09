import express from "express";
import {
   getAllUsersService,
}
   from "../services";
import {
   getBoardByIdCTRL,
   getBoardColumnsCTRL,
   getTaskDetailsCTRL,
   getUserBoardsCTRL
} from "../controllers";

const router = express.Router();

router.get("/:user_id/boards", getUserBoardsCTRL)

router.get("/users", getAllUsersService)

router.get("/boards/:board_id", getBoardByIdCTRL)

router.get("/tasks/:task_id", getTaskDetailsCTRL)

router.get("/columns/:board_id", getBoardColumnsCTRL)

export default router;
