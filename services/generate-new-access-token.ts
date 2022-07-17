import prisma from "@/libs/prisma";
import rndstr from "rndstr";

export const generateNewAccessTokenAsync = async () => {
  let token: string;
  do {
    token = rndstr(32);
  } while ((await prisma.user.findUnique({where: {accessToken: token}})) !== null);
  return token;
};