import { XataClient } from "../../xata";
const xata = new XataClient();
const handler = async (req, res) => {
  var params = req.query;
  if (!params.email) {
    res.status(400).json({ error: "Missing email" });
    return;
  }
  const records = await xata.db.global_data.getAll();
  var filteredRecords = records.filter((r) => r.email === params.email);
  res.status(200).json(filteredRecords);
};
export default handler;
