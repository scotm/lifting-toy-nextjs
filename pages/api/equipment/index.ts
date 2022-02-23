// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import parseID from "../../../util/parseID";
import getEM from "../../../util/getEM";
import withORM from "../../../util/withORM";
import { Equipment } from "../../../entities/Equipment";
import show_everything from "../../../util/show_everything";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const em = getEM();
  if (req.method === "POST") {
    await em.create(Equipment, { name: req.body.name });
    return res.status(200).send("Success!");
  }

  if (req.method === "DELETE") {
    await em.nativeDelete(Equipment, { id: parseID(req.body.id) });
    return res.status(200).send("Success!");
  }

  const result = await em.find(Equipment, {}, { orderBy: { ["name"]: "ASC" } });
  res.status(200).json(result);
}

export default withORM(handler);
