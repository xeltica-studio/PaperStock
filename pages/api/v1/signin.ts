import { returnError } from '@/misc/create-error-object';
import { returnResponse } from '@/misc/create-response';
import { ApiErrorCode, apiErrorCodes } from '@/models/api/error-code';
import { signinAsync } from '@/services/signin';
import { NextApiHandler } from 'next';
import { Infer, is, object, string } from 'superstruct';

export const SigninBodyStruct = object({
	name: string(),
	password: string(),
});

export type SigninBody = Infer<typeof SigninBodyStruct>;

const handler: NextApiHandler = async (req, res) => {
	if (req.method !== 'POST') {
		return returnError(res, 'INVALID_METHOD', 400);
	}
  
	const {body} = req;

	if (!is(body, SigninBodyStruct)) {
		return returnError(res, 'INVALID_PARAMS', 400);
	}
  
	try {
		const signin = await signinAsync(body);
		returnResponse(res, signin);
	} catch (e) {
		if (e instanceof Error && (apiErrorCodes as unknown as string[]).includes(e.message)) {
			returnError(res, e.message as ApiErrorCode, 400);
		}
	}
};

export default handler;
