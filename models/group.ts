import { User } from "./user";
export interface Group {
    id: string;
    name: string;
    usersCount: number;
    users: User[];
}
