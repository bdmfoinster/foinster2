import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let title, category, image_url;

    if (contentType.includes('application/json')) {
      const json = await request.json();
      title = json.title;
      category = json.category;
      image_url = json.image_url;
    } else {
      const formData = await request.formData();
      title = formData.get('title');
      category = formData.get('category');
      image_url = formData.get('image_url');
      const imageFile = formData.get('file');

      if (!image_url && imageFile && typeof imageFile !== 'string') {
        const fileExt = imageFile.name ? imageFile.name.split('.').pop() : 'jpg';
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `projects/${fileName}`;
        const buffer = Buffer.from(await imageFile.arrayBuffer());

        const { error: uploadError } = await supabaseAdmin.storage
          .from('images')
          .upload(filePath, buffer, {
            contentType: imageFile.type || 'image/jpeg',
            upsert: true
          });

        if (uploadError) {
          console.error("Storage error:", uploadError);
          return NextResponse.json({ error: "Storage: " + uploadError.message }, { status: 500 });
        }

        const { data: { publicUrl } } = supabaseAdmin.storage
          .from('images')
          .getPublicUrl(filePath);
        image_url = publicUrl;
      }
    }

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!image_url) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Insert into database using Admin key (bypasses RLS)
    const { data, error: dbError } = await supabaseAdmin.from("projects").insert([{
      title,
      category,
      image_url
    }]).select();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Database: " + dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error: " + error.message }, { status: 500 });
  }
}
