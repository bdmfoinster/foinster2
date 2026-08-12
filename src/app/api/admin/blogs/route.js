import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Check if the service role key is actually set, otherwise fall back to normal insert which might fail
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
       console.warn("WARNING: SUPABASE_SERVICE_ROLE_KEY is not set. Using anon key.");
    }
    
    // We try using the admin client first, which bypasses RLS
    // If the service key isn't set, this will fail or use the anon key if misconfigured.
    const { data, error } = await supabaseAdmin.from("blogs").insert([body]);

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
