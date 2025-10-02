export interface IsState {
  auth: {
    user: {
      _id: string;
      username: string;
      email: string;
      password: string;
      isOnline: boolean;
      isBanned: boolean;
      isMuted: boolean;
      isAdmin: boolean;
      createdAt: string;
      updatedAt: string;
    };
    isLoggedIn: boolean;
    token: string | null;
    isLoading: boolean;
    error: unknown | null;
  };
}

export type User = {
  username?: string;
  email: string;
  password: string;
};

export type UserData = {
  _id: string;
  username: string;
  email: string;
  password: string;
  isOnline: boolean;
  isBanned: boolean;
  isMuted: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
};

export type RegisterResponse = {
  status: number; // 201 on success
  message: string;
  userData: UserData;
  token: string;
};

export type ErrorResponse = {
  status: number;
  message: string; // error name from backend
  data: {
    message: string; // human-readable error message
  };
};
