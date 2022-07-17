import { REGEX_NAME } from '@/const';
import prisma from '@/libs/prisma';
import { returnError } from '@/misc/create-error-object';
import { returnResponse } from '@/misc/create-response';
import { signupAsync } from '@/services/signup';
import { NextApiHandler } from 'next';
import { Infer, is, object, string } from 'superstruct';

export const SignupBodyStruct = object({
	name: string(),
	password: string(),
});

export type SignupBody = Infer<typeof SignupBodyStruct>;

const handler: NextApiHandler = async (req, res) => {
	const s = await prisma.serverSetting.findFirst();
	if (!s) return returnError(res, 'INTERNAL_ERROR', 500);

	const count = await prisma.user.count({where: {isDeleted: false}});
	if (count > 0 && !s.canRegister) {
		return returnError(res, 'PERMISSION_DENIED', 403, 'User registration is disabled now.');
	}

	if (req.method !== 'POST') {
		return returnError(res, 'INVALID_METHOD', 400);
	}
  
	const {body} = req;

	if (!is(body, SignupBodyStruct)) {
		return returnError(res, 'INVALID_PARAMS', 400);
	}

	if (!REGEX_NAME.test(body.name)) {
		return returnError(res, 'INVALID_PARAMS', 400, 'name');
	}

	if (await prisma.user.findUnique({where: {name: body.name}})) {
		// ユーザー名が既に存在する場合はエラー
		return returnError(res, 'USER_ALREADY_EXISTS', 400);
	}
  
	const signup = await signupAsync(body);
	returnResponse(res, signup);
};

export default handler;
