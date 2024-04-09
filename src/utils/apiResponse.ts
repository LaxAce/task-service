import { Response } from "express"

export const catchError = (error: string, res: Response, code: number) => {
    return res.status(500).json({
        status: "fail",
        code: code ?? 400,
        error: error ? true : false,
        message: error,
        data: null,
    })
}

export const successResponse = (data: any, res: Response, message?: string) => {
    return res.status(200).json({
        code: 200,
        status: "success",
        message,
        data: data ?? {},
      });
}
