import { UserType } from "../../pages/chatPage/ChatPage.types";

export interface IsState {
    auth: {
        user: {
            isLoading: boolean,
            isLogIn: boolean,
            _id: string,
            username: string,
            password: string
            isOnline: boolean,
            isBanned: boolean,
            isMuted: boolean,
            isAdmin: boolean,
            createdAt: string,
            updatedAt: string
            token: string,
        };
    }
}

export type User = { password: string, username: string };

export interface Action {
    payload: {
        status: string,
        userData: UserType,
        token: string,
    }
    type: "auth/loginAuthRequest" | "auth/logoutAuthRequest" | "auth/loginAuthSuccess" | "auth/loginAuthError" | "auth/logoutAuthSuccess" | "auth/logoutAuthError";
}