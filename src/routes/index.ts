import express from "express";
import {
   createBoardCTRL,
   createUserCTRL,
   getAllUsersCTRL,
   getBoardByIdCTRL,
   getBoardColumnsCTRL,
   getTaskDetailsCTRL,
   getUserBoardsCTRL
} from "../controllers";

const router = express.Router();

router.route("/:user_id/boards")
   .get(getUserBoardsCTRL)
   .post(createBoardCTRL);

router.route("/users")
   .get(getAllUsersCTRL)
   .post(createUserCTRL);

router.route("/boards/:board_id")
   .get(getBoardByIdCTRL)

router.get("/tasks/:task_id", getTaskDetailsCTRL)

router.get("/columns/:board_id", getBoardColumnsCTRL)

export default router;
