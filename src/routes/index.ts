import express from "express";
import {
   createBoardCTRL,
   createColumnCTRL,
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

router.route("/columns/:board_id")
   .get(getBoardColumnsCTRL)
   .post(createColumnCTRL)

export default router;
