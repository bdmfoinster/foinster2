import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let name, role, description, is_active, display_order, imageUrl;

    if (contentType.includes('application/json')) {
      const json = await request.json();
      name = json.name;
      role = json.role;
      description = json.description || null;
      is_active = json.is_active !== undefined ? Boolean(json.is_active) : true;
      display_order = parseInt(json.display_order || '0', 10);
      imageUrl = json.image;
    } else {
      const formData = await request.formData();
      name = formData.get('name');
      role = formData.get('role');
      description = formData.get('description') || null;
      is_active = formData.get('is_active') === 'true';
      display_order = parseInt(formData.get('display_order') || '0', 10);
      imageUrl = formData.get('image_url') || '';
      const imageFile = formData.get('image');

      if (!imageUrl && imageFile && imageFile instanceof File) {
        const fileExt = imageFile.name ? imageFile.name.split('.').pop() : 'jpg';
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const buffer = Buffer.from(await imageFile.arrayBuffer());

        const { error: uploadError } = await supabaseAdmin.storage
          .from('team')
          .upload(fileName, buffer, {
            contentType: imageFile.type || 'image/jpeg',
            upsert: true
          });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabaseAdmin.storage.from('team').getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }
    }

    if (!name || !role || !imageUrl) {
      return NextResponse.json({ error: 'Name, role, and image are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.from('team_members').insert([{
      name,
      role,
      description,
      image: imageUrl,
      display_order,
      is_active
    }]).select();

    if (error) throw error;
    return NextResponse.json({ success: true, data: data[0] });

  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
