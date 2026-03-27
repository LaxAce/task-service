import { Request, Response } from "express";
import {
    createUserService,
    updateBoardService,
    createBoardService,
    getAllUsersService,
    deleteBoardService,
    createColumnService,
    getUserBoardsServices,
    getBoardDetailsService,
    getTaskDetailsServices,
    getBoardColumnsServices,
    createTaskService,
    updateTaskService,
    deleteTaskService,
    updateSubTaskService,
} from "../services";
import {
    catchError,
    successResponse
} from "../utils/apiResponse";

export const createUserCTRL = async (req: Request, res: Response) => {
    try {

        const result = await createUserService(req.body);

        return successResponse(result, res, "User created successfully");
    } catch (error: any) {
        return catchError(error.message, res, 500);
    }
}

export const getAllUsersCTRL = async (req: Request, res: Response) => {
    try {
        const result = await getAllUsersService();

        return successResponse(result, res, "Users fetched successfully");
    } catch (error: any) {
        return catchError(error.message, res, 500);
    }
}

export const getUserBoardsCTRL = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;

        const result = await getUserBoardsServices(user_id)

        return successResponse(result, res, "User boards fetched successfully");
    } catch (error: any) {
        return catchError(error.message, res, 500);
    }
}

export const createBoardCTRL = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const { name, columns } = req.body;

        const result = await createBoardService({ name, userId: user_id, columns });

        return successResponse(result, res, "Board created successfully");
    } catch (error: any) {
        return catchError(error.message, res, 500);
    }
}

export const updateBoardCTRL = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params;
        const { name, columns } = req.body;

        const result = await updateBoardService({ name, boardId: board_id, columns });

        return successResponse(result, res, "Board updated successfully");
    } catch (error: any) {
        return catchError(error.message, res, 500);
    }
}

export const deleteBoardCTRL = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params;

        const result = await deleteBoardService(board_id);

        return successResponse(result, res, "Board deleted successfully");
    } catch (error: any) {
        return catchError(error.message, res, 500);
    }
}

export const getBoardByIdCTRL = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params;

        const result = await getBoardDetailsService(board_id);

        return successResponse(result, res, "Board details fetched successfully");
    } catch (error: any) {
        return catchError(error.message, res, 500);
    }
}

export const createColumnCTRL = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params;
        const { name } = req.body;

        const result = await createColumnService({ name, boardId: board_id });

        return successResponse(result, res, "Column created successfully");
    } catch (error: any) {
        return catchError(error.message, res, 500);
    }
}

export const getTaskDetailsCTRL = async (req: Request, res: Response) => {
    try {
        const { task_id } = req.params;

        const result = await getTaskDetailsServices(task_id);

        return successResponse(result, res, "Task details fetched successfully");
    } catch (error: any) {
        return catchError(error.message, res, 500);
    }
}

export const getBoardColumnsCTRL = async (req: Request, res: Response) => {
    try {
        const { board_id } = req.params;

        const result = await getBoardColumnsServices(board_id);

        return successResponse(result, res, "Board columns fetched successfully");
    } catch (error: any) {
        return catchError(error.message, res, 500);
    }
}

export const createTaskCTRL = async (req: Request, res: Response) => {
    try {
        const { title, description, boardColumnId, subTasks } = req.body;

        const result = await createTaskService({ title, description, subTasks, boardColumnId });

        return successResponse(result, res, "Task created successfully");
    } catch (error: any) {
        return catchError(error.message, res, 500);
    }
}

export const updateTaskCTRL = async (req: Request, res: Response) => {
    try {
        const { task_id } = req.params;
        const { title, description, subTasks, boardColumnId } = req.body;

        const result = await updateTaskService({title, description, subTasks, boardColumnId, taskId: task_id});

        return successResponse(result, res, "Task updated successfully");
    } catch (error: any) {
        return catchError(error.message, res, 500);
    }
}

export const deleteTaskCTRL = async (req: Request, res: Response) => {
    try {
        const { task_id } = req.params;

        const result = await deleteTaskService(task_id);

        return successResponse(result, res, "Task deleted successfully")
    } catch (error: any) {
        return catchError(error.message, res, 500)
    }
}

export const updateSubTaskCTRL = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, isCompleted } = req.body;

        const result = await updateSubTaskService({id, isCompleted, title});

        return successResponse(result, res, "Subtask updated successfully");
    } catch (error: any) {
        return catchError(error.message, res, 500);
    }
}
