import { ObjectId } from "mongodb";

export interface IDatabaseAuthorization{
    value: string;
    userId: ObjectId;
    createdAt: Date;
}

export interface IDatabaseRequestLog {
    method: string;
    pathname: string;
    createdAt: Date;
}

export interface IDatabaseUser {
    username: string;
    passwordHash: string;
    createdAt: Date;
}
