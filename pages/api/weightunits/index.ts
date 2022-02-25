// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { WeightUnits } from "../../../entities/WeightUnits";
import getEM from "../../../util/getEM";
import parseID from "../../../util/parseID";
import withORM from "../../../util/withORM";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const em = getEM();
  if (req.method === "POST") {
    const { name } = req.body;
    await em.persistAndFlush(em.create(WeightUnits, { name: name }));
    return res.status(200).send("Success!");
  }

  if (req.method === "DELETE") {
    await em.nativeDelete(WeightUnits, { id: parseID(req.body.id) });
    return res.status(200).send("Success!");
  }

  res
    .status(200)
    .json(await em.find(WeightUnits, {}, { orderBy: { ["id"]: "ASC" } }));
}
export default withORM(handler);
