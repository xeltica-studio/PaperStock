import Router from "koa-router";
import $ from "cafy";
import { userNamePattern, objectIdPattern } from "@/misc/patterns";
import { buildErrorResponse, buildResponse } from "@/server/misc/build-response";
import { ApiError, ErrorId } from "@/server/misc/api-error";
import { passwordVerify, passwordHash } from "@/server/misc/password";
import { generateToken } from "@/server/misc/generate-token";
import { User } from "@/models/entities/user";
import { Users } from "@/models";
import { generateId } from "@/misc/generate-id";
import { ensure } from "@/misc/ensure";

const router = new Router();

router.get("/ping", (ctx, _) => {
	ctx.body = buildResponse({ pong: "pong" });
});

router.get("/teapot", (ctx, _) => {
	ctx.status = 418;
	ctx.body = buildErrorResponse("I'm a teapot.", 418);
});

router.post("/signup", async (ctx, _) => {
	const name = ctx.query.username as string;
	const password = ctx.query.password as string;

	// ユーザー名とパスワードが正しいフォーマットかどうか検証
	if ($.str.match(userNamePattern).nok(name)) {
		throw new ApiError("Invalid username", ErrorId.invalidParam);
	}
	if ($.str.nok(password)) {
		throw new ApiError("Invalid password", ErrorId.invalidParam);
	}

	// ユーザーが既に存在していればエラー
	if (await Users.findOne({ name })) {
		throw new ApiError("Already exists", ErrorId.duplicated);
	}

	const hashedPassword = passwordHash(password, 16);
	const token = generateToken();

	const user = await Users.save({
		id: generateId(),
		profileName: "",
		description: "",
		role: "",
		isAdmin: false,
		isModerator: false,
		iconUrl: "",
		headerUrl: "",
		createdAt: new Date(),
		name,
		hashedPassword,
		token
	});

	const packed = await Users.pack(user, user).then(ensure);

	ctx.body = buildResponse({
		user: packed,
		token
	});
});

router.post("/signin", async (ctx, _) => {
	const name = ctx.query.username as string;
	const password = ctx.query.password as string;

	// ユーザー名とパスワードが正しいフォーマットかどうか検証
	if ($.str.match(userNamePattern).nok(name)) {
		throw new ApiError("Invalid username", ErrorId.invalidParam);
	}
	if ($.str.nok(password)) {
		throw new ApiError("Invalid password", ErrorId.invalidParam);
	}

	const user = await Users.findOne({ name });

	// ユーザーが存在しなければエラー
	if (!user) {
		throw new ApiError("No such user", ErrorId.noSuchUser);
	}

	const { hashedPassword, token } = user;

	// パスワードが不一致であればエラー
	if (!passwordVerify(password, hashedPassword)) {
		throw new ApiError("Failed to authenticate", ErrorId.failedToAuthenticate);
	}

	ctx.body = buildResponse({
		user: await Users.pack(user),
		token
	});
});

router.get("/user/@:name", async (ctx, _) => {
	const name: string = ctx.params.name;

	if ($.str.match(userNamePattern).nok(name)) {
		throw new ApiError("Invalid username", ErrorId.invalidParam);
	}

	const user = await Users.findOne({ name }) as User;

	if (!user) {
		throw new ApiError(`User @${name} is not Found`, ErrorId.noSuchUser);
	}

	ctx.body = buildResponse({ user: await Users.pack(user) });
});

router.get("/user/:id", async (ctx, _) => {
	const id: string = ctx.params.id;

	if ($.str.match(objectIdPattern).nok(id)) {
		throw new ApiError("Invalid Id", ErrorId.invalidParam);
	}

	const user = await Users.findOne(id) as User;

	if (!user) {
		throw new ApiError(`User id:${id} is not found`, ErrorId.noSuchUser);
	}

	ctx.body = buildResponse({ user: await Users.pack(user) });
});

export default router.routes();
