import { XataClient } from "../../xata";
const xata = new XataClient();
const handler = async (req, res) => {
  if (!req.headers["user-agent"].includes("Mozilla")) {
    res.status(400).json({
      error:
        "Not a browser request. To enhance security of the user data, we allow requests from only a browser.",
    });
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
  const url = req.body.url;
  if (!url) {
    res.status(400).json({ error: "Missing URL. Please try again." });
    return;
  }
  const slug = generateRandomSlug();
  await xata.db.global_data.create({
    slug,
    url,
  });
  res.status(200).json({ slug, success: true });
};
export default handler;
