import { XataClient } from "../../xata";
const xata = new XataClient();
const handler = async (req, res) => {
  const { id, url } = req.body;
  if (!id || !url) {
    res.status(400).json({ error: "Missing URL or slug. Please try again." });
    return;
  }
  var data = await xata.db.lnk.getAll();
  data = data.filter((item) => item.slug.toLowerCase() === id.toLowerCase());
  if (data.length > 0) {
    res
      .status(400)
      .json({ error: "Oops! That slug already exists. Try a different one." });
    return;
  }
  const record = await xata.db.lnk.create({
    slug: id,
    url: url,
  });
  if (record) {
    res.status(200).json({ ...record, error: null });
  }
};
export default handler;
