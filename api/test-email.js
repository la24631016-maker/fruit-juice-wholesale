import { Resend } from "resend";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.ORDER_NOTIFY_EMAIL;

    if (!apiKey || !notifyEmail) {
      return res.status(500).json({
        ok: false,
        message: "缺少 RESEND_API_KEY 或 ORDER_NOTIFY_EMAIL",
        hasApiKey: Boolean(apiKey),
        hasNotifyEmail: Boolean(notifyEmail),
      });
    }

    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: "雷盟堂訂單 <onboarding@resend.dev>",
      to: [notifyEmail],
      subject: "雷盟堂測試通知信",
      text: "這是一封雷盟堂訂單系統的測試通知信。如果你收到這封信，代表 Resend 設定成功。",
    });

    return res.status(200).json({
      ok: true,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
      detail: error,
    });
  }
}