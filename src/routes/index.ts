import express from "express";
import {
   createUserCTRL,
   updateBoardCTRL,
   createBoardCTRL,
   getAllUsersCTRL,
   deleteBoardCTRL,
   createColumnCTRL,
   getBoardByIdCTRL,
   getUserBoardsCTRL,
   getTaskDetailsCTRL,
   getBoardColumnsCTRL,
} from "../controllers";

const router = express.Router();

router.route("/users")
   .get(getAllUsersCTRL)
   .post(createUserCTRL);

router.route("/:user_id/boards")
   .get(getUserBoardsCTRL)
   .post(createBoardCTRL);

router.route("/boards/:board_id")
   .get(getBoardByIdCTRL)
   .patch(updateBoardCTRL)
   .delete(deleteBoardCTRL)

router.route("/columns/:board_id")
   .get(getBoardColumnsCTRL)
   .post(createColumnCTRL)

router.get("/tasks/:task_id", getTaskDetailsCTRL)

export default router;
