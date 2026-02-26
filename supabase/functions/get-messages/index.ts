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

    if (!access_key) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Verify key is valid and active
    const { data: keyData } = await supabase
      .from("access_keys")
      .select("access_key, status")
      .eq("access_key", access_key)
      .eq("status", "active")
      .single();

    if (!keyData) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get messages: broadcasts (target_key is null) + messages for this key
    const { data: messages } = await supabase
      .from("messages")
      .select("id, title, body, created_at")
      .or(`target_key.is.null,target_key.eq.${access_key}`)
      .order("created_at", { ascending: false })
      .limit(50);

    return new Response(
      JSON.stringify({ messages: messages || [] }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Server error." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
