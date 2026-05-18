export default function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL || "";
  let parsed = null;

  try {
    const url = new URL(supabaseUrl);
    parsed = {
      protocol: url.protocol,
      host: url.host,
      pathname: url.pathname,
    };
  } catch (error) {
    parsed = {
      error: error.message,
    };
  }

  return res.status(200).json({
    ok: true,
    hasSupabaseUrl: Boolean(process.env.SUPABASE_URL),
    hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    supabaseUrlPreview: parsed,
  });
}