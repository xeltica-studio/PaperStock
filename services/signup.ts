import bcrypt from 'bcrypt';

import prisma from '@/libs/prisma';
import { ApiSigninResponse } from '@/models/api/signin-response';
import { generateNewAccessTokenAsync } from './generate-new-access-token';

export type SignupInit = {
  name: string;
  password: string;
};

/**
 * アカウントを登録します。
 * @params opts アカウント登録に必要な情報。
 */
export const signupAsync = async (opts: SignupInit): Promise<ApiSigninResponse> => {
	const {name, password} = opts;
	const hashedPassword = await bcrypt.hash(password, 10);
	const usersCount = await prisma.user.count();

	const res = await prisma.user.create({
		data: {
			name,
			hashedPassword,
			accessToken: await generateNewAccessTokenAsync(),
			// 初めて登録したユーザーは強制的に管理者とする
			role: usersCount === 0 ? 'admin' : 'user',
		},
		select: {
			id: true,
			createdAt: true,
			name: true,
			role: true,
			accessToken: true,
		},
	});
	return res;
};