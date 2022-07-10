import { Entity, PrimaryColumn, Index, Column } from "typeorm";
import { id } from "../id";

@Entity()
export class User {
	@PrimaryColumn(id())
	public id: string;

	@Index()
	@Column("time with time zone")
	public createdAt: Date;

	@Index()
	@Column("varchar", { length: 256 })
    public name: string;

	@Index()
	@Column("varchar", { length: 256, nullable: true })
    public profileName: string | null;

	@Column("varchar", { length: 512, nullable: true })
	public description: string | null;

	@Index()
	@Column("varchar", { length: 256, nullable: true })
	public role: string | null;

	@Column("boolean")
	public isAdmin: boolean;

	@Column("boolean")
    public isModerator: boolean;

	@Column("varchar", { length: 256, nullable: true })
	public iconUrl: string | null;

	@Column("varchar", { length: 256, nullable: true })
	public headerUrl: string | null;

	@Column("varchar", { length: 1024 })
	public hashedPassword: string;

	@Column("varchar", { length: 16 })
	public token: string;
}
