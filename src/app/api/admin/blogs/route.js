import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title');
    const excerpt = formData.get('excerpt');
    const content = formData.get('content');
    const date = formData.get('date');
    const imageFile = formData.get('file');

    if (!imageFile || typeof imageFile === 'string') {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    // 1. Upload to storage using Admin key (bypasses RLS)
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `blogs/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('images')
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Storage error:", uploadError);
      return NextResponse.json({ error: "Storage: " + uploadError.message }, { status: 500 });
    }

    // 2. Get Public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('images')
      .getPublicUrl(filePath);

    // 3. Insert into database using Admin key (bypasses RLS)
    const { data, error: dbError } = await supabaseAdmin.from("blogs").insert([{
      title,
      excerpt,
      content,
      image_url: publicUrl,
      date
    }]);

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Database: " + dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error: " + error.message }, { status: 500 });
  }
}
