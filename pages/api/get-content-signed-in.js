import { XataClient } from "../../xata";
const xata = new XataClient();
const handler = async (req, res) => {
  var params = req.query;
  if (!params.email) {
    res.status(400).json({ error: "Missing email" });
    return;
  }
  const records = await xata.db.links.getAll();
  const filtered = records.filter((record) => record.email === params.email);
  res.status(200).json(filtered[0].user_links);
};
export default handler;
