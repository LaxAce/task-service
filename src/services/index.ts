import pool from "../database";
import queries from "../queries";
import { colorsList } from "../constants";
import { areAllStringsUnique, getRandomColor } from "../utils/helpers";
import {
    IUserPayload,
    ICreateBoardPayload,
    IUpdateBoardPayload,
    ICreateColumnPayload,
    ICreateTaskPayload,
    IUpdateTaskPayload,
    IUpdateSubtaskPayload,
} from "../types";

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
                const subs = await pool.query(queries.getSubTasksByTaskId, [task?.id]);

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

export const updateBoardService = async (payload: IUpdateBoardPayload) => {
    try {
        const { name, boardId, columns } = payload;

        const existingBoard = await pool.query(queries.getBoardById, [boardId]);

        if (!existingBoard.rows?.[0]?.id) {
            throw new Error("Board does not exist")
        }

        const activeColumns = columns?.filter(column => !column?.isDeleting && column?.name)
            .map(column => column?.name);

        if (!areAllStringsUnique(activeColumns)) {
            throw new Error("No two column should have the same name")
        }

        const result = await pool.query(queries.updateBoard, [name, boardId]);

        // Column Mutation
        if (columns?.length) {
            await Promise.all(columns.map(async (column) => {
                if (!column.id) {
                    await createColumnService({ name: column.name, boardId: result.rows?.[0]?.id });
                } else if (column.isDeleting) {
                    await pool.query(queries.deleteBoardColumn, [column.id]);
                } else if (column.isEditing) {
                    await pool.query(queries.updateBoardColumn, [column.name, column.id]);
                }
            }));
        }

        return { ...result.rows?.[0], columns };
    } catch (error) {
        console.error("Error updating board", error);
        throw error;
    }
}

export const deleteBoardService = async (boardId: string) => {
    try {
        const existingBoard = await pool.query(queries.getBoardById, [boardId]);

        if (!existingBoard.rows?.[0]?.id) {
            throw new Error("Board does not exist")
        }

        // Delete all existing board columns
        await pool.query(queries.deleteBoardColumns, [boardId]);

        // Delete board
        await pool.query(queries.deleteBoard, [boardId]);

        return { id: boardId };
    } catch (error) {
        console.error("Error deleting board", error);
        throw error
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

// export const updateColumnService = async (payload: ICreateColumnPayload) => {
//     try {
//         const { boardId, name } = payload;

//         const existingBoard = await pool.query(queries.getBoardById, [boardId]);
//         const existingColumn = await pool.query(queries.getColumnByNameForABoard, [name, boardId]);

//         if (!existingBoard.rows?.[0]?.id) {
//             throw new Error("Board not found");
//         } else if (existingColumn.rows?.[0]?.id) {
//             throw new Error("Column already exist");
//         }

//         const colorTag = await generateColorTag(boardId, name);

//         const result = await pool.query(queries.createColumn, [name, colorTag, boardId]);

//         return result.rows?.[0];
//     } catch (error) {
//         console.error("Error creating column", error);
//         throw error;
//     }
// }

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

export const getTaskDetailsServices = async (taskId: string) => {
    try {
        const task = await pool.query(queries.getTaskById, [taskId]);

        if (!task.rows?.[0]?.id) {
            throw new Error("Task not found");
        };

        const subs = await pool.query(queries.getSubTasksByTaskId, [taskId]);

        return { ...task.rows[0], subTasks: subs.rows };
    } catch (error) {
        console.error('Error getting task details:', error);
        throw error;
    }
}

export const createTaskService = async (payload: ICreateTaskPayload) => {
    try {
        const { title, description, boardColumnId, subTasks } = payload;

        const existingTask = await pool.query(queries.getTaskByNameForABoard, [title, boardColumnId]);

        if (existingTask.rows?.[0]?.id) {
            throw new Error("Task already exist on board");
        }

        if (!areAllStringsUnique(subTasks)) {
            throw new Error("Can't have duplicate subtask");
        }

        const result = await pool.query(queries.createTask, [title, description, "", boardColumnId]);

        if (subTasks?.length) {
            await Promise.all(subTasks.map(async (sub) => await pool.query(queries.createSubTask, [sub, result.rows?.[0]?.id])));
        }

        return { ...result.rows?.[0], subTasks };
    } catch (error) {
        console.error("Error creating task", error);
        throw error;
    }
}

export const updateTaskService = async (payload: IUpdateTaskPayload) => {
    try {
        const { title, description, boardColumnId, taskId, subTasks } = payload;

        const existingTask = await pool.query(queries.getTaskById, [taskId]);

        if (!existingTask.rows?.[0]?.id) {
            throw new Error("Task not found");
        }

        const activeSubTasks = subTasks?.filter(sub => !sub.isDeleting && sub.title)
            .map(sub => sub.title);

        if (!areAllStringsUnique(activeSubTasks)) {
            throw new Error("Can't have duplicate subtasks");
        }

        const result = await pool.query(queries.updateTask, [title, description, boardColumnId, taskId]);

        if (subTasks.length) {
            Promise.all(subTasks.map(async (sub) => {
                if (!sub.id) {
                    await pool.query(queries.createSubTask, [sub.title, taskId]);
                } else if (sub.isDeleting) {
                    await pool.query(queries.deleteSubTask, [sub.id]);
                } else if (sub.isEditing) {
                    await updateSubTaskService({id: sub.id, title: sub.title});
                }
            }))
        }

        return { ...result.rows?.[0], subTasks };
    } catch (error) {
        console.error("Error updating task", error);
        throw error;
    }
}

export const deleteTaskService = async (taskId: string) => {
    try {
        const existingTask = await pool.query(queries.getTaskById, [taskId]);

        if (!existingTask.rows?.[0].id) {
            throw new Error("Ticket not found");
        }

        await pool.query(queries.deleteSubTaskByTaskId, [taskId]);

        await pool.query(queries.deleteTask, [taskId]);

        return { id: taskId }
    } catch (error) {
        console.error("Error deleting task", error);
        throw error;
    }
}

export const updateSubTaskService = async (payload: IUpdateSubtaskPayload) => {
    try {
        const { id, title, isCompleted } = payload;

        const existingSubtask = await pool.query(queries.getSubTasksById, [id]);

        if (!existingSubtask.rows?.[0]?.id) {
            throw new Error("Subtask not found");
        }
        
        const titleValue = title ?? existingSubtask.rows?.[0]?.title;
        const isCompletedValue = isCompleted ?? existingSubtask.rows?.[0]?.isCompleted;
        
        const result = await pool.query(queries.updateSubTask, [titleValue, isCompletedValue, id]);

        return { ...result.rows?.[0] }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
