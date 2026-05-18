import { createClient } from "@supabase/supabase-js";

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

function createOrderNo() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replaceAll("-", "");
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `LMT-${date}-${random}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed",
    });
  }

  try {
    const body = req.body || {};
    const items = Array.isArray(body.items) ? body.items : [];

    if (!items.length) {
      return res.status(400).json({
        ok: false,
        message: "請先選擇品項",
      });
    }

    const customerName = String(body.customerName || "").trim();
    const phone = String(body.phone || "").trim();
    const address = String(body.address || "").trim();

    if (!customerName || !phone || !address) {
      return res.status(400).json({
        ok: false,
        message: "請填寫訂購人、電話與配送地址",
      });
    }

    const totalQty = items.reduce(
      (sum, item) => sum + Number(item.qty || 0),
      0
    );

    const totalAmount = items.reduce(
      (sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0),
      0
    );

    const supabase = createSupabaseAdmin();
    const orderNo = createOrderNo();

    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_no: orderNo,
        customer: {
          name: customerName,
          phone,
          address,
        },
        items,
        total: totalAmount,
        total_qty: totalQty,
        payment: body.payment || "貨到付款",
        status: "待確認",
        note: body.note || "",
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        ok: false,
        message: "訂單儲存失敗",
        detail: error.message,
      });
    }

    return res.status(200).json({
      ok: true,
      order: data,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "伺服器錯誤",
      detail: error.message,
    });
  }
}