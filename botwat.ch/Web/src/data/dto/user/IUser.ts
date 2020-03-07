export interface IUser {
    id: number;
    email: string;
    name: string;
    password: string | null;
    discordHandle: string | null;
    token: string | null;
}