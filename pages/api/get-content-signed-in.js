import { XataClient } from "../../xata";
import { getSession } from "next-auth/react";
const xata = new XataClient();
const handler = async (req, res) => {
  const session = await getSession({ req });
  var params = req.query;
  if (!session) {
    res.status(401).json({ error: "Not a signed in user." });
    return;
  }
  var params = req.query;
  if (!params.email) {
    res.status(400).json({ error: "Missing email" });
    return;
  }
  if (session.user.email !== params.email) {
    res.status(401).json({ error: "Not authorized." });
    return;
  }
  var record = await xata.db.global_data.filter("email", params.email).getAll();
  record = record.reverse();
  res.status(200).json(record);
};
export default handler;
