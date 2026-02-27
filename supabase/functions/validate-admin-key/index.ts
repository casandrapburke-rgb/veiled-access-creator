const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const ADMIN_KEY = "admin_aB3$x9Qm#lZ2@pR5!kL8*jH6^vN4&tY7wEsD1~gF0";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { admin_key } = await req.json();

    if (!admin_key || typeof admin_key !== "string" || admin_key.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Admin Key Required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (admin_key.trim() !== ADMIN_KEY) {
      return new Response(
        JSON.stringify({ error: "Invalid Key. Access Denied." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Server error." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
