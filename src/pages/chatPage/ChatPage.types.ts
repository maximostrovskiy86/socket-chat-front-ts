export type Message = {
    message: string;
    username: string;
    updatedAt: string;
    createdAt: string;
    _id: string;
}

export type User = {
    createdAt: string;
    isAdmin: boolean;
    isBanned: boolean;
    isMuted: boolean;
    isOnline: boolean;
    updatedAt: string;
    username: string;
    _id: string;
}

export type UserOnline = {
    createdAt: string;
    iat: number;
    id: string;
    username: string;
    isAdmin: boolean;
    isBanned: boolean;
    isMuted: boolean;
}