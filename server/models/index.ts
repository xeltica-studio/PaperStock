import { getCustomRepository } from "typeorm";
import { UserRepository } from "./repositories/user";
import { NoteRepository } from "./repositories/note";

export const Users = getCustomRepository(UserRepository);
export const Notes = getCustomRepository(NoteRepository);
