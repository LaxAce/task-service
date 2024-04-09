import { Request, Response } from "express";
import pool from "../database";
import queries from "../queries";

// export const createUserService = async (req: Request, res: Response) => {
//     try {
//         const { name, email } = req.body;
//         const result = await pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [name, email]);
//         return res.status(201).json(result.rows[0]);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json(error);
//     }
// }

export const getAllUsersService = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(queries.getAllUsers);
        return res.status(200).json({ users: result.rows, count: result.rowCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

export const getUserBoardsServices = async (userId: string) => {
    try {
        const result = await pool.query(queries.getUserBoards, [userId]);

        return { boards: result.rows, count: result.rowCount };
    } catch (error) {
        console.error('Error getting users board by id:', error);
        throw error;
    }
}

export const getBoardDetailsService = async (boardId: string) => {
    try {
        const result = await getBoardColumnsServices(boardId);

        const mappedResult = await Promise.all(result?.map(async (column) => {
            const tasks = await pool.query(queries.getColumnTasks, [column?.id]);

            return { ...column, tasks: tasks.rows };
        }));

        const res = await Promise.all(mappedResult?.map(async result => {

            const taskMap = await Promise.all(result?.tasks?.map(async (task: any) => {
                const subs = await pool.query(queries.getSubTasksById, [task?.id]);

                const completedSubs = subs?.rows?.filter((sub: any) => sub.isCompleted);

                return {...task, subTasksTotal: subs?.rowCount, subTasksCompleted: completedSubs.length}
            }));

            return {...result, tasks: taskMap}
        }))

        return res;
    } catch (error: any) {
        console.error('Error getting board by id:', error);
        throw error;
    }
}

export const getTaskDetailsServices = async (taskId: string) => {
    try {
        const task = await pool.query(queries.getTaskById, [taskId]);

        if (!task.rows?.[0]?.id) {
            throw new Error("Task not found");
        };

        const subs = await pool.query(queries.getSubTasksById, [taskId]);

        return { ...task.rows[0], subTasks: subs.rows };
    } catch (error) {
        console.error('Error getting task details:', error);
        throw error;
    }
}

export const getBoardColumnsServices = async (boardId: string) => {
    try {
        const board = await pool.query(queries.getBoardById, [boardId]);

        if (!board.rows?.[0]?.id) {
            throw new Error("Board not found");
        }

        const columns = await pool.query(queries.getBoardColumns, [boardId]);

        return columns.rows;
    } catch (error) {
        console.error('Error getting board columns:', error);
        throw error;
    }
}
