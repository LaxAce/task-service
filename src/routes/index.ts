import express from "express";
import {
   loginCTRL,
   createTaskCTRL,
   updateTaskCTRL,
   deleteTaskCTRL,
   createUserCTRL,
   updateBoardCTRL,
   createBoardCTRL,
   deleteBoardCTRL,
   verifyEmailCTRL,
   createColumnCTRL,
   getBoardByIdCTRL,
   updateSubTaskCTRL,
   getUserBoardsCTRL,
   getTaskDetailsCTRL,
   getBoardColumnsCTRL,
   verifyForgotPasswordCTRL,
   initiateForgotPasswordCTRL,
} from "../controllers";

import {
   validateLogin,
   validateTaskId,
   validateBoardId,
   validateUpdateTask,
   validateCreateTask,
   validateCreateUser,
   validateUpdateBoard,
   validateCreateBoard,
   validateVerifyEmail,
   validateCreateColumn,
   validateUpdateSubTask,
   validateForgotPassword,
   validateVerifyForgotPassword,
} from "../validations";
import { verifyToken } from "../utils/auth";

const router = express.Router();

// Auth 
router.route("/register")
   .post(validateCreateUser, createUserCTRL);

router.route("/verify-email")
   .post(validateVerifyEmail, verifyEmailCTRL);

router.route("/forgot_password")
   .post(validateForgotPassword, initiateForgotPasswordCTRL);

router.route("/verify_forgot_password")
   .post(validateVerifyForgotPassword, verifyForgotPasswordCTRL);

router.route("/login")
   .post(validateLogin, loginCTRL);

router.use(verifyToken);

router.route("/boards")
   .get(getUserBoardsCTRL)
   .post(validateCreateBoard, createBoardCTRL);

router.route("/boards/:board_id")
   .all(validateBoardId)
   .get(getBoardByIdCTRL)
   .delete(deleteBoardCTRL)
   .put(validateUpdateBoard, updateBoardCTRL);

router.route("/columns/:board_id")
   .all(validateBoardId)
   .get(getBoardColumnsCTRL)
   .post(validateCreateColumn, createColumnCTRL);

router.route("/tasks/:task_id")
   .all(validateTaskId)
   .get(getTaskDetailsCTRL)
   .delete(deleteTaskCTRL)
   .put(validateUpdateTask, updateTaskCTRL);

router.route("/tasks")
   .post(validateCreateTask, createTaskCTRL);

router.route("/sub_task/:id")
   .patch(validateUpdateSubTask, updateSubTaskCTRL);

export default router;
