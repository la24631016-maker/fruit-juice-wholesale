import { createClient } from "@supabase/supabase-js";

function cleanEnv(value) {
  return String(value || "").trim();
}

function createSupabaseAdmin() {
  const supabaseUrl = cleanEnv(process.env.SUPABASE_URL);
  const serviceKey = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  if (!supabaseUrl.startsWith("https://")) {
    throw new Error("SUPABASE_URL 格式錯誤，必須以 https:// 開頭");
  }

  return createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        "x-application-name": "fruit-juice-wholesale",
      },
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

function getErrorMessage(error) {
  if (!error) return "Unknown error";

  const causeMessage = error.cause?.message
    ? `｜cause: ${error.cause.message}`
    : "";

  const errorCode = error.cause?.code
    ? `｜code: ${error.cause.code}`
    : "";

  return `${error.message || String(error)}${causeMessage}${errorCode}`;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed",
    });
  }

  try {
    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("category", { ascending: true })
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Products Supabase query error:", error);

      return res.status(500).json({
        ok: false,
        message: `商品讀取失敗：${error.message}`,
      });
    }

    return res.status(200).json({
      ok: true,
      products: (data || []).map(normalizeProduct),
    });
  } catch (error) {
    const message = getErrorMessage(error);

    console.error("Products API error:", {
      message,
      supabaseUrlExists: Boolean(process.env.SUPABASE_URL),
      serviceKeyExists: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      supabaseUrlStart: cleanEnv(process.env.SUPABASE_URL).slice(0, 35),
    });

    return res.status(500).json({
      ok: false,
      message: `商品讀取失敗：${message}`,
    });
  }
}