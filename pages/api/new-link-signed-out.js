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
  var generateRandomSlug = function () {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };
  var url = req.body.url;
  if (!url) {
    res.status(400).json({ error: "Missing URL. Please try again." });
    return;
  }
  var slug = generateRandomSlug();
  await xata.db.global_data.create({
    slug: slug,
    url: url,
  });
  res.status(200).json({ slug: slug, success: true });
};
export default handler;
