import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

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

function isAdminLoggedIn(req) {
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) return false;

  const cookies = parseCookies(req.headers.cookie || "");
  const token = cookies.admin_session;

  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [loginValue, signature] = parts;
  const expectedSignature = sign(loginValue, sessionSecret);

  if (signature !== expectedSignature) return false;

  const [, timestampString] = loginValue.split(":");
  const timestamp = Number(timestampString);
  const oneDay = 24 * 60 * 60 * 1000;

  if (!timestamp || Date.now() - timestamp > oneDay) return false;

  return true;
}

function createSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function normalizeProduct(product) {
  return {
    id: product.id,
    category: product.category,
    name: product.name,
    spec: product.spec,
    price: Number(product.price || 0),
    note: product.note || "",
    image: product.image || "",
    active: Boolean(product.active),
    sortOrder: Number(product.sort_order || 0),
  };
}

function toDbProduct(body) {
  const id =
    body.id ||
    `${body.category || "product"}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  return {
    id,
    category: body.category || "juice",
    name: String(body.name || "").trim(),
    spec: String(body.spec || "").trim(),
    price: Number(body.price || 0),
    note: String(body.note || "").trim(),
    image: String(body.image || "").trim(),
    active: Boolean(body.active),
    sort_order: Number(body.sortOrder || body.sort_order || 0),
    updated_at: new Date().toISOString(),
  };
}

export default async function handler(req, res) {
  if (!isAdminLoggedIn(req)) {
    return res.status(401).json({
      ok: false,
      message: "尚未登入",
    });
  }

  try {
    const supabase = createSupabaseAdmin();

    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("category", { ascending: true })
        .order("sort_order", { ascending: true });

      if (error) {
        return res.status(500).json({
          ok: false,
          message: `商品讀取失敗：${error.message}`,
        });
      }

      return res.status(200).json({
        ok: true,
        products: data.map(normalizeProduct),
      });
    }

    if (req.method === "POST") {
      const product = toDbProduct(req.body || {});

      if (!product.name || !product.spec) {
        return res.status(400).json({
          ok: false,
          message: "請填寫品項名稱與規格",
        });
      }

      const { data, error } = await supabase
        .from("products")
        .insert(product)
        .select()
        .single();

      if (error) {
        return res.status(500).json({
          ok: false,
          message: `商品新增失敗：${error.message}`,
        });
      }

      return res.status(200).json({
        ok: true,
        product: normalizeProduct(data),
      });
    }

    if (req.method === "PATCH") {
      const product = toDbProduct(req.body || {});

      if (!product.id) {
        return res.status(400).json({
          ok: false,
          message: "缺少品項 ID",
        });
      }

      const { data, error } = await supabase
        .from("products")
        .update(product)
        .eq("id", product.id)
        .select()
        .single();

      if (error) {
        return res.status(500).json({
          ok: false,
          message: `商品更新失敗：${error.message}`,
        });
      }

      return res.status(200).json({
        ok: true,
        product: normalizeProduct(data),
      });
    }

    if (req.method === "DELETE") {
      const { id } = req.body || {};

      if (!id) {
        return res.status(400).json({
          ok: false,
          message: "缺少品項 ID",
        });
      }

      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) {
        return res.status(500).json({
          ok: false,
          message: `商品刪除失敗：${error.message}`,
        });
      }

      return res.status(200).json({
        ok: true,
      });
    }

    return res.status(405).json({
      ok: false,
      message: "Method not allowed",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: `伺服器錯誤：${error.message}`,
    });
  }
}