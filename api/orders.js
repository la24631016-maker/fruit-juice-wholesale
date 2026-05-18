import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    function formatCurrency(value) {
  return `NT$${Number(value || 0).toLocaleString("zh-TW")}`;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendOrderEmail({
  orderNo,
  customerName,
  phone,
  address,
  payment,
  note,
  items,
  totalQty,
  totalAmount,
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.ORDER_NOTIFY_EMAIL;

  if (!apiKey || !notifyEmail) {
    console.warn("Email notification skipped: missing RESEND_API_KEY or ORDER_NOTIFY_EMAIL");
    return;
  }

  const resend = new Resend(apiKey);

  const textItems = items
    .map((item) => {
      const subtotal = Number(item.qty || 0) * Number(item.price || 0);
      return `${item.name} × ${item.qty}｜${item.spec}｜單價 ${formatCurrency(item.price)}｜小計 ${formatCurrency(subtotal)}`;
    })
    .join("\n");

  const itemRows = items
    .map((item) => {
      const subtotal = Number(item.qty || 0) * Number(item.price || 0);

      return `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.name)}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.spec)}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:center;">${escapeHtml(item.qty)}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right;">${formatCurrency(item.price)}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right;">${formatCurrency(subtotal)}</td>
        </tr>
      `;
    })
    .join("");

  await resend.emails.send({
    from: "雷盟堂訂單 <onboarding@resend.dev>",
    to: [notifyEmail],
    subject: `【雷盟堂新訂單】${orderNo}`,
    text: `
【雷盟堂新訂單】${orderNo}

訂購人：${customerName}
電話：${phone}
地址：${address}
付款方式：${payment}
備註：${note || "無"}

品項：
${textItems}

總數量：${totalQty}
總金額：${formatCurrency(totalAmount)}
    `.trim(),
    html: `
      <div style="font-family:Arial,'Noto Sans TC',sans-serif;line-height:1.7;color:#111827;">
        <h2 style="margin:0 0 12px;">雷盟堂新訂單</h2>
        <p style="margin:0 0 16px;color:#374151;">訂單編號：<strong>${escapeHtml(orderNo)}</strong></p>

        <div style="padding:16px;border:1px solid #e5e7eb;border-radius:12px;background:#f9fafb;margin-bottom:16px;">
          <p><strong>訂購人：</strong>${escapeHtml(customerName)}</p>
          <p><strong>電話：</strong>${escapeHtml(phone)}</p>
          <p><strong>地址：</strong>${escapeHtml(address)}</p>
          <p><strong>付款方式：</strong>${escapeHtml(payment)}</p>
          <p><strong>備註：</strong>${escapeHtml(note || "無")}</p>
        </div>

        <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;">
          <thead>
            <tr style="background:#f3f4f6;">
              <th style="padding:8px;text-align:left;">品項</th>
              <th style="padding:8px;text-align:left;">規格</th>
              <th style="padding:8px;text-align:center;">數量</th>
              <th style="padding:8px;text-align:right;">單價</th>
              <th style="padding:8px;text-align:right;">小計</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>

        <div style="margin-top:16px;padding:16px;border-radius:12px;background:#111827;color:white;">
          <p style="margin:0;">總數量：<strong>${escapeHtml(totalQty)}</strong></p>
          <p style="margin:4px 0 0;">總金額：<strong>${formatCurrency(totalAmount)}</strong></p>
        </div>
      </div>
    `,
  });
}
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

    const { error } = await supabase
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
  });

    if (error) {
      console.error("Supabase insert error:", error);

      return res.status(500).json({
        ok: false,
        message: `訂單儲存失敗：${error.message}`,
        detail: error.message,
      });
    }

    try {
  await sendOrderEmail({
    orderNo,
    customerName,
    phone,
    address,
    payment: body.payment || "貨到付款",
    note: body.note || "",
    items,
    totalQty,
    totalAmount,
  });

  console.log("Order email sent:", orderNo);
} catch (emailError) {
  console.error("Order email notification failed:", emailError);
}

return res.status(200).json({
  ok: true,
  orderNo,
});
  } catch (error) {
    console.error("Order API error:", error);

    return res.status(500).json({
      ok: false,
      message: `伺服器錯誤：${error.message}`,
      detail: error.message,
    });
  }
}