import { XataClient } from "../../xata";
const xata = new XataClient();
const handler = async (req, res) => {
  try {
    var slug = req.body.body.slug;
    const records = await xata.db.global_data.getAll();
    var record = records.find((record) => record.slug === slug);
    var id = record.id;
    await xata.db.global_data.delete(id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default handler;
