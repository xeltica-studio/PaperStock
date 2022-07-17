import bcrypt from 'bcrypt';

import prisma from '@/libs/prisma';
import { ApiSigninResponse } from '@/models/api/signin-response';

export type SigninInit = {
  name: string;
  password: string;
};

/**
 * アカウントを登録します。
 * @params opts アカウント登録に必要な情報。
 */
export const signinAsync = async (opts: SigninInit): Promise<ApiSigninResponse> => {
	const {name, password} = opts;
  
	const user = await prisma.user.findFirst({
		where: {
			name: {
				equals: name,
				mode: 'insensitive',
			},
		}
	});

	if (!user) {
		// ユーザーが存在しない場合はエラー
		throw new Error('USER_NOT_FOUND');
	}

	if (!(await bcrypt.compare(password, user.hashedPassword))) {
		// パスワードが一致しない場合はエラー
		throw new Error('PASSWORD_MISMATCH');
	}

	return {
		id: user.id,
		createdAt: user.createdAt,
		name: user.name,
		role: user.role,
		accessToken: user.accessToken,
	};
};