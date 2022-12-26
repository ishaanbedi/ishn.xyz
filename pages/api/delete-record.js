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
  try {
    const slug = req.body.body.slug;
    const calledEmail = req.body.body.email;
    const allRecords = await xata.db.global_data.getAll();
    const record = allRecords.find((record) => record.slug === slug);
    const email = record.email;
    if (email !== calledEmail) {
      res.status(401).json({ error: "Not authorized." });
      return;
    }
    const id = record.id;
    await xata.db.global_data.delete(id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export default handler;
