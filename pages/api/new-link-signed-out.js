import { XataClient } from "../../xata";
const xata = new XataClient();
const handler = async (req, res) => {
  var generateRandomSlug = function () {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };
  var url = req.body.url;
  var slug = generateRandomSlug();
  if (!url) {
    res.status(400).json({ error: "Missing URL. Please try again." });
    return;
  }
  const record = await xata.db.unregistered_links.create({
    url: url,
    slug: slug,
  });
  await xata.db.global_slugs.create({
    slug: slug,
  });
  res.status(200).json({ record, success: true });
};
export default handler;
