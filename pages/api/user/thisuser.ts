// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../db";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getSession(req, res);
  if (!session) {
    return res.status(404).send("User not found in session");
  }
  res.status(200).json(
    await prisma.user.findUnique({
      where: {
        external_id: session.user.sub,
      },
    })
  );
});
