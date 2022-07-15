import prisma from "@/libs/prisma";
import { returnError } from "@/misc/create-error-object";
import { returnResponse } from "@/misc/create-response";
import { ApiServerSetting } from "@/models/api/server-setting";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const s = await prisma.serverSetting.findFirst();
  if (!s) return returnError(res, 'INTERNAL_ERROR', 500);

  const setting: ApiServerSetting = {
    serverName: s.serverName ?? "PaperStock",
    serverIconUrl: s.serverIconUrl,
    ownerName: s.ownerName,
    sidebarMenu: s.sidebarMenu as [],
    isUserOnly: s.isUserOnly,
    canRegister: s.canRegister,
  };

  return returnResponse(res, setting);
};

export default handler;
