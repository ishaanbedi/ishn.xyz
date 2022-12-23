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
  await xata.db.global_data.create({
    slug: slug,
    url: url,
  });
  res.status(200).json({ slug: slug, success: true });
};
export default handler;
