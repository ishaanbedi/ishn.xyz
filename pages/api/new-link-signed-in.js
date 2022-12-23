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
  var email = req.body.email;
  var url = req.body.url;
  var slug = req.body.slug;
  if (!url) {
    res.status(400).json({ error: "Missing URL. Please try again." });
    return;
  }
  var data = await xata.db.global_data.getAll();
  data = data.filter((item) => item.slug === slug);
  if (data.length > 0) {
    res
      .status(400)
      .json({
        error:
          "Slug already exists. Please try again. Leave the slug field blank to generate a random slug.",
      });
    return;
  }
  if (!slug) {
    var randomSlug = generateRandomSlug();
    var data = await xata.db.global_data.getAll();
    data = data.filter((item) => item.slug === randomSlug);
    if (data.length > 0) {
      randomSlug = generateRandomSlug();
    }
    slug = randomSlug;
  }
  if (!email) {
    res.status(400).json({ error: "Missing email. Something went wrong." });
    return;
  }
  await xata.db.global_data.create({
    slug: slug,
    url: url,
    registered: true,
    email: email,
    views: 0,
  });
  res.status(200).json({ slug: slug, success: true });
};
export default handler;
