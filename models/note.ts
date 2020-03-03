import { NoteVisibility } from "./note-visibility";
import { Group } from "./group";
import { User } from "./user";

export interface Note {
    id: string;
    title: string;
    body: string;
    visibility: NoteVisibility;
    groupId?: string;
    group?: Group;
    authorId: string;
    author: User;
    pinned: boolean;
    tags: string[];
}
