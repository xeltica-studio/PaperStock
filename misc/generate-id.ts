import Snowflake from "snowflake-id";

const s: any = new Snowflake({
	mid: 114514, // todo MACアドレスを取る
	offset: (2020 - 1970) * 31536000 * 1000
});

export const generateId = () => {
	return s.generate() as string;
};
