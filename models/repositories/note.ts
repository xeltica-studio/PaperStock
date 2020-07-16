import { EntityRepository, Repository } from "typeorm";
import { Note } from "../entities/note";
import { User } from "../entities/user";
import { ClassOrId } from "../../misc/class-or-id";
import { ensure } from "@/misc/ensure";
import serverSetting from "@/server-setting";

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {
	public async pack (src: ClassOrId<Note>, client?: ClassOrId<User> | null): Promise<Note | null> {
		const note = typeof src === "string" ? await this.findOne(src).then(ensure) : src;
		const clientId = typeof client === "string" ? client : client != null ? client.id : null;

		// もし自分自身のであれば返す
		if (note.authorId === clientId) { return note; }

		// todo 自分の所属グループのノートであれば返す

		if (note.readPermission === "signed-in" && !!clientId) { return note; }

		// パブリックモードかつ公開範囲が全員であれば
		if (note.readPermission === "everyone" && (serverSetting.public || !!clientId)) { return note; }
		return null;
	}

	public async packMany (notes: ClassOrId<Note>[], client?: ClassOrId<User> | null): Promise<Note[]> {
		return (await Promise.all(notes.map(n => this.pack(n, client)))).filter((n): n is Note => n != null);
	}
}
