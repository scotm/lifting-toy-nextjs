// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { Category } from "../../../entities/Category";
import parseID from "../../../util/parseID";
import getEM from "../../../util/getEM";
import withORM from "../../../util/withORM";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: only allow POST and DELETE if they've got a valid authorisation token in the headers
  const em = getEM();
  if (req.method === "POST") {
    await em.create(Category, { name: req.body.name });
    return res.status(200).send("Success!");
  }

  if (req.method === "DELETE") {
    await em.nativeDelete(Category, { id: parseID(req.body.id) });
    return res.status(200).send("Success!");
  }
  const categories = await em.find(
    Category,
    {},
    { orderBy: { ["name"]: "ASC" } }
  );

  // Find "All" and put it at the top.
  const key = (e: Category) => e.name === "All";
  const piece = categories.find(key);
  if (piece !== undefined) {
    const index = categories.findIndex(key);

    categories.splice(index, 1);
    categories.unshift(piece);
  }
  return res.status(200).json(categories);
}

export default withORM(handler);
