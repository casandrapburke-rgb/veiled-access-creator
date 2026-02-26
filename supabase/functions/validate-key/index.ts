import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { access_key } = await req.json();

    if (!access_key || typeof access_key !== "string" || access_key.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Access Key Required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error } = await supabase
      .from("access_keys")
      .select("*")
      .eq("access_key", access_key.trim())
      .single();

    if (error || !data) {
      return new Response(
        JSON.stringify({ error: "Invalid Key. Access Denied." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (data.status === "revoked") {
      return new Response(
        JSON.stringify({ error: "Access Revoked. Contact Administration." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update last_login
    await supabase
      .from("access_keys")
      .update({ last_login: new Date().toISOString() })
      .eq("id", data.id);

    return new Response(
      JSON.stringify({
        success: true,
        key: data.access_key,
        role: data.role,
        user_name: data.assigned_user_name,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Server error." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
