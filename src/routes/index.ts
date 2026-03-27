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
   createTaskCTRL,
   updateTaskCTRL,
   deleteTaskCTRL,
   updateSubTaskCTRL,
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
   .put(updateBoardCTRL)
   .delete(deleteBoardCTRL);

router.route("/columns/:board_id")
   .get(getBoardColumnsCTRL)
   .post(createColumnCTRL);

router.route("/tasks/:task_id")
   .get(getTaskDetailsCTRL)
   .put(updateTaskCTRL)
   .delete(deleteTaskCTRL);

router.route("/tasks")
   .post(createTaskCTRL);

router.route("/sub_task/:id")
   .patch(updateSubTaskCTRL);

export default router;
