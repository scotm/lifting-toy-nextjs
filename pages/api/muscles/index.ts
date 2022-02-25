// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import parseID from "../../../util/parseID";
import getEM from "../../../util/getEM";
import withORM from "../../../util/withORM";
import { Muscles } from "../../../entities/Muscles";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const em = getEM();
  if (req.method === "POST") {
    const { name, isFront } = req.body;
    await em.create(Muscles, { name: name, isFront: isFront });
    return res.status(200).send("Success!");
  }

  if (req.method === "DELETE") {
    await em.nativeDelete(Muscles, { id: parseID(req.body.id) });
    return res.status(200).send("Success!");
  }

  res
    .status(200)
    .json(await em.find(Muscles, {}, { orderBy: { ["name"]: "ASC" } }));
}

export default withORM(handler);
