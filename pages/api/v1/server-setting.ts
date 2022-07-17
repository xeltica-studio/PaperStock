import prisma from '@/libs/prisma';
import { returnError } from '@/misc/create-error-object';
import { returnEmpty, returnResponse } from '@/misc/create-response';
import { ApiServerSetting } from '@/models/api/server-setting';
import { NextApiHandler } from 'next';
import { array, boolean, Infer, is, literal, object, optional, string, union } from 'superstruct';

const SidebarMenuStruct = object({
	type: union([literal('link'), literal('separator'), literal('external-link')]),
	icon: optional(string()),
	path: optional(string()),
	isDisabled: optional(boolean()),
});

export type SidebarMenu = Infer<typeof SidebarMenuStruct>;

export const UpdateServerSettingStruct = object({
	serverName: optional(string()),
	serverIconUrl: optional(string()),
	ownerName: optional(string()),
	sidebarMenu: optional(array(SidebarMenuStruct)),
	isUserOnly: optional(boolean()),
	canRegister: optional(boolean()),
});

export type UpdateServerSetting = Infer<typeof UpdateServerSettingStruct>;

const handler: NextApiHandler = async (req, res) => {
	const s = await prisma.serverSetting.findFirst();
	if (!s) return returnError(res, 'INTERNAL_ERROR', 500);

	switch (req.method) {
		case 'GET': {
			const setting: ApiServerSetting = {
				serverName: s.serverName ?? 'PaperStock',
				serverIconUrl: s.serverIconUrl,
				ownerName: s.ownerName,
				sidebarMenu: s.sidebarMenu as [],
				isUserOnly: s.isUserOnly,
				canRegister: s.canRegister,
			};
    
			return returnResponse(res, setting);
		}
		case 'PUT': {
			const {body} = req;
			if (!is(body, UpdateServerSettingStruct)) {
				return returnError(res, 'INVALID_PARAMS', 400);
			}
			const data: Partial<UpdateServerSetting> = {};
			if (body.serverName) data.serverName = body.serverName;
			if (body.serverIconUrl) data.serverIconUrl = body.serverIconUrl;
			if (body.ownerName) data.ownerName = body.ownerName;
			if (body.sidebarMenu) data.sidebarMenu = body.sidebarMenu;
			if (body.isUserOnly) data.isUserOnly = body.isUserOnly;
			if (body.canRegister) data.canRegister = body.canRegister;
			await prisma.serverSetting.update({
				where: { id: s.id },
				data
			});
			return returnEmpty(res);
		}
		default: {
			return returnError(res, 'INVALID_METHOD', 400);
		}
	}
};

export default handler;
