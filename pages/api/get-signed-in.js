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
    res.status(400).json({ error: "Missing URL or slug. Please try again." });
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
    res.status(400).json({ error: "Missing email. Please try again." });
    return;
  }

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
  res.status(200).send("OK");
};
export default handler;
