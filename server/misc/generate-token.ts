import rndstr from "rndstr";

export const generateToken = () => rndstr("a-zA-Z0-9", 16);
