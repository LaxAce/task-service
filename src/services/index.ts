import { Request, Response } from "express";
import pool from "../database";

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
        const result = await pool.query("SELECT * FROM users");
        return res.status(200).json({ users: result.rows, count: result.rowCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}
