import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export interface IUserPayload {
    email: string;
    password: string;
    lastName?: string;
    firstName?: string;
}

export interface ICreateBoardPayload {
    name: string;
    userId: string;
    columns: string[];
}

export interface ICreateColumnPayload {
    name: string;
    boardId: string;
}

export interface IUpdateBoardPayload {
    name: string;
    boardId: string;
    columns: {
        id?: string;
        name: string;
        isEditing: boolean;
        isDeleting: boolean;
    }[];
}

export interface ICreateTaskPayload {
    title: string;
    subTasks: string[];
    description: string;
    boardColumnId: string;
}

export interface IUpdateTaskPayload {
    title: string;
    description: string;
    subTasks: {
        id?: string;
        title: string;
        isEditing: boolean;
        isDeleting: boolean;
    }[]; 
    boardColumnId: string;
    taskId: string;
}

export interface IUpdateSubtaskPayload {
    id: string;
    title?: string;
    isCompleted?: boolean;
}

export interface IValidationSchema {
    body?: ZodSchema;
    query?: ZodSchema;
    params?: ZodSchema;
}

export interface ILoginPayload {
    email: string;
    password: string;
}

export interface IVerifyPayload {
    id: string;
    uniqueId: string;
}

export interface IForgotPasswordPayload {
    id: string;
    uniqueId: string;
    password: string;
}
