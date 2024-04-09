import { Request, Response } from "express";
import {
    getBoardColumnsServices,
    getBoardDetailsService,
    getTaskDetailsServices,
    getUserBoardsServices
} from "../services";
import {
    catchError,
    successResponse
} from "../utils/ApiResponse";


export const getUserBoardsCTRL = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;

        const result = await getUserBoardsServices(user_id)

        return successResponse(result, res, "User boards fetched successfully")
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
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
