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

export const getUserBoards = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;

        const result = await pool.query(queries.getUserBoards, [user_id]);

        return res.status(200).json({ boards: result.rows, count: result.rowCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}
