// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../entities/User";
import getEM from "../../../util/getEM";
import parseID from "../../../util/parseID";
import withORM from "../../../util/withORM";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const em = getEM();
  if (req.method === "DELETE") {
    await em.nativeDelete(User, { id: parseID(req.body.id) })
    return res.status(200).send("Success!");
  }

  res.status(200).json(
    await em.find(User, {},{ orderBy: { ["lastname"]: "ASC" } })
  );
}

export default withORM(handler);