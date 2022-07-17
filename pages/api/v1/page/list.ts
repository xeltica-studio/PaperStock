import { NextApiHandler } from 'next';

import { prisma } from '@/libs/prisma';
import { returnError } from '@/misc/create-error-object';
import { returnResponse } from '@/misc/create-response';

const handler: NextApiHandler = async (req, res) => {        
	if (!prisma) {
		return returnError(res, 'INTERNAL_ERROR', 500, 'DB is not initiliazed.');
	}

	if (req.method !== 'GET') {
		return returnError(res, 'INVALID_METHOD', 400);
	}

	const pages = await prisma.page.findMany({
		select: {
			path: true,
			id: true,
			title: true,
		},
		where: {
			isDeleted: false,
		},
		orderBy: {
			path: 'asc',
		}
	});

	return returnResponse(res, pages);
};

export default handler;