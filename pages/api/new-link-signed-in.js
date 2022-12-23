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
  var data = await xata.db.global_slugs.getAll();
  data = data.filter((item) => item.slug === slug);
  if (data.length > 0) {
    res.status(400).json({ error: "Slug already exists. Please try again." });
    return;
  }
  if (!slug) {
    var randomSlug = generateRandomSlug();
    var data = await xata.db.links.getAll();
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
  var data = await xata.db.links.getAll();
  const records = await xata.db.links.getAll();
  const record = records.find((r) => r.email === email);
  if (!record) {
    await xata.db.links.create({
      email: email,
      user_links: "[]",
    });
  }
  var userLinks = record.user_links;
  if (userLinks) {
    userLinks = JSON.parse(userLinks);
  } else {
    userLinks = [];
  }
  userLinks.push({
    slug: slug,
    url: url,
  });
  userLinks = JSON.stringify(userLinks);
  await xata.db.links.update(record.id, {
    email: email,
    user_links: userLinks,
  });
  await xata.db.global_slugs.create({
    slug: slug,
  });
  res.status(200).json({ slug: slug, success: true });
};
export default handler;
