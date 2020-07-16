import { Entity, PrimaryColumn, Index, Column, ManyToOne, JoinColumn } from "typeorm";
import { id } from "../id";
import { NotePermission, notePermissions } from "./note-permission";
import { Group } from "./group";
import { User } from "./user";

@Entity()
export class Note {
	@PrimaryColumn(id())
	public id: string;

	@Index()
	@Column("time with time zone")
	public createdAt: Date;

	@Index()
	@Column("time with time zone")
	public updatedAt: Date;

	@Column("varchar", { length: 256, nullable: false })
	public title: string;

	@Column("varchar", { length: 65536, nullable: false })
	public body: string;

	@Column("enum", { enum: notePermissions })
	public readPermission: NotePermission;

	@Column("enum", { enum: notePermissions })
	public writePermission: NotePermission;

	@Index()
	@Column({
		...id(),
		nullable: true
	})
	public groupId: Group["id"] | null;

	@ManyToOne(() => Group, {
		onDelete: "SET NULL"
	})
	@JoinColumn()
	public group: User | null;

	@Index()
	@Column({
		...id(),
		nullable: true
	})
	public authorId: User["id"] | null;

	@ManyToOne(() => User, {
		onDelete: "SET NULL"
	})
	@JoinColumn()
	public author: User | null;

	@Column("varchar", { length: 32, array: true, default: "{}" })
	public tags: string[];
}
