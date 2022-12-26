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
  const params = req.body;
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
  const generateRandomSlug = function () {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  const email = req.body.email;
  const url = req.body.url;
  let slug = req.body.slug;
  if (!url) {
    res.status(400).json({ error: "Missing URL. Please try again." });
    return;
  }
  let data = await xata.db.global_data.getAll();
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
    let randomSlug = generateRandomSlug();
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
    slug,
    url,
    registered: true,
    email,
    views: 0,
  });
  res.status(200).json({ slug, success: true });
};
export default handler;
