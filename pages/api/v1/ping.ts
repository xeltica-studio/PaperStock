import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  res.json({
    ok: true,
    q: req.query
  });
};

export default handler;
