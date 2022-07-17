import prisma from '@/libs/prisma';
import { returnResponse } from '@/misc/create-response';
import { Meta } from '@/models/api/meta';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	const pageCount = await prisma.page.count({
		where: { isDeleted: false }
	});
	const usersCount = await prisma.user.count({
		where: { isDeleted: false }
	});
	return returnResponse(res, {
		pageCount,
		requireSetup: usersCount === 0,
		version: process.env.npm_package_version,
	} as Meta);
};

export default handler;
