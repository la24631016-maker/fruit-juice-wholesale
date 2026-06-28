export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed",
    });
  }

  console.log("LINE_WEBHOOK_BODY", JSON.stringify(req.body, null, 2));

  return res.status(200).json({
    ok: true,
  });
}