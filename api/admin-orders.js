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

function normalizeOrder(order) {
  return {
    id: order.order_no,
    dbId: order.id,
    createdAt: new Date(order.created_at).toLocaleString("zh-TW", {
      hour12: false,
    }),
    customerName: order.customer?.name || "",
    phone: order.customer?.phone || "",
    address: order.customer?.address || "",
    payment: order.payment,
    status: order.status,
    items: order.items || [],
    note: order.note || "",
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
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        return res.status(500).json({
          ok: false,
          message: "讀取訂單失敗",
          detail: error.message,
        });
      }

      return res.status(200).json({
        ok: true,
        orders: data.map(normalizeOrder),
      });
    }

    if (req.method === "PATCH") {
      const { orderNo, status } = req.body || {};

      if (!orderNo || !status) {
        return res.status(400).json({
          ok: false,
          message: "缺少訂單編號或狀態",
        });
      }

      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("order_no", orderNo);

      if (error) {
        return res.status(500).json({
          ok: false,
          message: "更新訂單失敗",
          detail: error.message,
        });
      }

      return res.status(200).json({ ok: true });
    }

    if (req.method === "DELETE") {
      const { orderNo } = req.body || {};

      if (!orderNo) {
        return res.status(400).json({
          ok: false,
          message: "缺少訂單編號",
        });
      }

      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("order_no", orderNo);

      if (error) {
        return res.status(500).json({
          ok: false,
          message: "刪除訂單失敗",
          detail: error.message,
        });
      }

      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({
      ok: false,
      message: "Method not allowed",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "伺服器錯誤",
      detail: error.message,
    });
  }
}