export interface IsState {
  auth: {
    user: {
      _id: string;
      username: string;
      password: string;
      isOnline: boolean;
      isBanned: boolean;
      isMuted: boolean;
      isAdmin: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    isLoggedIn: boolean;
    token: string | null;
    isLoading: boolean;
    error: unknown | null;
  };
}

export type User = {
  username: string;
  email?: string;
  password: string;
};
