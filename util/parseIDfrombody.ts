import { NextApiRequest } from "next";

export default function parseID(req: NextApiRequest): number {
  console.log(req.body["id"]);
  console.log(req.query);

  const { id } = req.body ?? req.query;
  return Number.parseInt(Array.isArray(id) ? id[0] : id);
}
