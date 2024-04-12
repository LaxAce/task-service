import pool from "../database";
import queries from "../queries";
import { colorsList } from "../constants";
import { areAllStringsUnique, getRandomColor } from "../utils/helpers";

interface IUserPayload {
    email: string;
    lastName?: string;
    firstName?: string;
}

interface ICreateBoardPayload {
    name: string;
    userId: string;
    columns: string[];
}

interface ICreateColumnPayload {
    name: string;
    boardId: string;
}

export const createUserService = async (payload: IUserPayload) => {
    try {

        const user = await pool.query(queries.getUserByEmail, [payload.email]);

        if (user?.rows?.[0]?.id) {
            return user.rows?.[0];
        }

        const result = await pool.query(
            queries.createUser,
            [payload.email, payload.firstName || "", payload?.lastName || ""]
        );

        return result.rows?.[0];
    } catch (error) {
        console.error('Error creating user', error);
        throw error;
    }
}

export const getAllUsersService = async () => {
    try {
        const result = await pool.query(queries.getAllUsers);

        return result.rows;
    } catch (error) {
        console.error('Error getting users', error);
        throw error;
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

                return { ...task, subTasksTotal: subs?.rowCount, subTasksCompleted: completedSubs.length }
            }));

            return { ...result, tasks: taskMap }
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
        console.error("Error getting board columns:", error);
        throw error;
    }
}

export const createBoardService = async (payload: ICreateBoardPayload) => {
    try {
        const { name, userId, columns } = payload;

        const existingBoard = await pool.query(queries.getBoardByNameForAUser, [name, userId]);

        if (existingBoard.rows?.[0]?.id) {
            throw new Error("Board with this name already exist")
        }

        if (!areAllStringsUnique(columns)) {
            throw new Error("No two column should have the same name")
        }

        const result = await pool.query(queries.createBoard, [name, userId]);

        if (columns?.length) {
            await Promise.all(columns.map(async (column) => await createColumnService({ name: column, boardId: result.rows?.[0]?.id })));
        }

        return { ...result.rows?.[0], columns };
    } catch (error) {
        console.error("Error creating board", error);
        throw error;
    }
}

export const createColumnService = async (payload: ICreateColumnPayload) => {
    try {
        const { boardId, name } = payload;

        const existingBoard = await pool.query(queries.getBoardById, [boardId]);
        const existingColumn = await pool.query(queries.getColumnByNameForABoard, [name, boardId]);

        if (!existingBoard.rows?.[0]?.id) {
            throw new Error("Board not found");
        } else if (existingColumn.rows?.[0]?.id) {
            throw new Error("Column already exist");
        }

        const colorTag = await generateColorTag(boardId, name);

        const result = await pool.query(queries.createColumn, [name, colorTag, boardId]);

        return result.rows?.[0];
    } catch (error) {
        console.error("Error creating column", error);
        throw error;
    }
}

export const generateColorTag = async (boardId: string, columnName: string) => {
    try {
        const columns = await pool.query(queries.getBoardColumns, [boardId]);

        const currentColors = columns.rows?.map((column: any) => column.colorTag);

        if (columnName == "Todo") {
            return colorsList[0];
        } else if (columnName == "Doing") {
            return colorsList[1];
        } else if (columnName == "Done") {
            return colorsList[2];
        } else {
            const color = getRandomColor(currentColors);
            return color;
        }
    } catch (error) {
        console.error("Error generating color");
        throw error;
    }
}
