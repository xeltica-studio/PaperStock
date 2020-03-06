import { NotePermission } from "./note-permission";
import { Group } from "./group";
import { User } from "./user";

export interface Note {
    id: string;
    title: string;
    body: string;
    readPermission: NotePermission;
    writePermission: NotePermission;
    groupIds?: string[];
    groups?: Group[];
    authorId: string;
    author: User;
    pinned: boolean;
    tags: string[];
}
