import { Entity, Column, PrimaryColumn, Index } from "typeorm";
import { id } from "../id";

@Entity()
export class Group {
	@PrimaryColumn(id())
	public id: string;

	@Index()
	@Column("time with time zone")
	public createdAt: Date;

	@Column("varchar", { length: 256, nullable: false })
	public name: string;
}
