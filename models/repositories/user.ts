import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user";
import { ClassOrId } from "../../misc/class-or-id";
import { ensure } from "@/misc/ensure";

export type PackedUser = {
	id: string,
	createdAt: Date,
	name: string,
	profileName: string | null,
	description: string | null,
	role: string | null,
	isAdmin: boolean,
	isModerator: boolean,
	iconUrl: string | null,
	headerUrl: string | null,
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	public async pack (src: ClassOrId<User>, client?: ClassOrId<User> | null): Promise<PackedUser | null> {
		const user = typeof src === "string" ? await this.findOne(src).then(ensure) : src;
		const clientId = typeof client === "string" ? client : client != null ? client.id : null;

		if (!clientId) { return null; }

		return {
			id: user.id,
			createdAt: user.createdAt,
			name: user.name,
			profileName: user.profileName,
			description: user.description,
			role: user.role,
			isAdmin: user.isAdmin,
			isModerator: user.isModerator,
			iconUrl: user.iconUrl,
			headerUrl: user.headerUrl
		};
	}

	public async packMany (users: ClassOrId<User>[], client?: ClassOrId<User> | null): Promise<PackedUser[]> {
		return (await Promise.all(users.map(u => this.pack(u, client)))).filter((n): n is PackedUser => n != null);
	}
}
