import crypto from "crypto";

function sign(value, secret) {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const { username, password } = req.body || {};

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.SESSION_SECRET;

  if (!adminUsername || !adminPassword || !sessionSecret) {
    return res.status(500).json({
      ok: false,
      message: "Server config missing",
    });
  }

  if (username !== adminUsername || password !== adminPassword) {
    return res.status(401).json({
      ok: false,
      message: "帳號或密碼錯誤",
    });
  }

  const loginValue = `admin:${Date.now()}`;
  const signature = sign(loginValue, sessionSecret);
  const token = `${loginValue}.${signature}`;

  res.setHeader(
    "Set-Cookie",
    `admin_session=${token}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=86400`
  );

  return res.status(200).json({ ok: true });
}