import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function myApiRoute(req, res) {
  const session = getSession(req, res);
  console.log(session);
  res.json({ protected: "My Secret", id: session?.user.sub });
});
