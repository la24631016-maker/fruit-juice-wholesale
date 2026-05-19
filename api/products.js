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
      return res.status(500).json({
        ok: false,
        message: `商品讀取失敗：${error.message}`,
      });
    }

    return res.status(200).json({
      ok: true,
      products: data.map(normalizeProduct),
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: `伺服器錯誤：${error.message}`,
    });
  }
}