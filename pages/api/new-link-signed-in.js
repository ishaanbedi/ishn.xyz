import { XataClient } from "../../xata";
import { getSession } from "next-auth/react";
const xata = new XataClient();
const handler = async (req, res) => {
  if (!req.headers["user-agent"].includes("Mozilla")) {
    res.status(400).json({
      error:
        "Not a browser request. To enhance security of the user data, we allow requests from only a browser.",
    });
    return;
  }
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: "Not a signed in user." });
    return;
  }
  var params = req.body;
  if (!params.email) {
    res.status(400).json({
      error: "Missing email.",
    });
    return;
  }
  if (session.user.email !== params.email) {
    res.status(401).json({ error: "Not authorized." });
    return;
  }
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
    res.status(400).json({
      error:
        "Slug already exists. Please try again. Leave the slug field blank to generate a random slug.",
      internalCode: "slug-exists",
    });
    return;
  }
  if (!slug) {
    var randomSlug = generateRandomSlug();
    data = await xata.db.global_data.getAll();
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
