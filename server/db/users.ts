import { db } from "../misc/db";
import { User } from "@/models/user";

export interface PrivateUser extends User {
	token: string;
	hashedPassword: string;
}

export namespace Users {
	export const collection = db.get("users");
	export const get = async (id: string | null, name: string | null = null, details = false) => {
		if (!id && !name) {
			throw new Error("specify id or name");
		}
		const user = await collection.findOne(id ? { _id: id } : { name }, details ? {} : {
			fields: {
				_id: true,
				name: true,
				profileName: true,
				description: true,
				role: true,
				isAdmin: true,
				isModerator: true,
				iconUrl: true,
				headerUrl: true,
				createdAt: true
			}
		});
		if (!user) { return null; }

		user.id = user._id;
		return user as User;
	};
}
