import crypto from "crypto";

function sign(value, secret) {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

function parseCookies(cookieHeader = "") {
  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((cookie) => cookie.trim().split("="))
      .filter(([key, value]) => key && value)
  );
}

export default function handler(req, res) {
  const sessionSecret = process.env.SESSION_SECRET;

  if (!sessionSecret) {
    return res.status(500).json({ ok: false });
  }

  const cookies = parseCookies(req.headers.cookie || "");
  const token = cookies.admin_session;

  if (!token) {
    return res.status(401).json({ ok: false });
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return res.status(401).json({ ok: false });
  }

  const [loginValue, signature] = parts;
  const expectedSignature = sign(loginValue, sessionSecret);

  if (signature !== expectedSignature) {
    return res.status(401).json({ ok: false });
  }

  const [, timestampString] = loginValue.split(":");
  const timestamp = Number(timestampString);
  const oneDay = 24 * 60 * 60 * 1000;

  if (!timestamp || Date.now() - timestamp > oneDay) {
    return res.status(401).json({ ok: false });
  }

  return res.status(200).json({ ok: true });
}