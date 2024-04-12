export interface IUserPayload {
    email: string;
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
    columns: string[];
}