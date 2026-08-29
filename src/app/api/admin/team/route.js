import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';

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
    const formData = await request.formData();
    const name = formData.get('name');
    const role = formData.get('role');
    const description = formData.get('description') || null;
    const is_active = formData.get('is_active') === 'true';
    const display_order = parseInt(formData.get('display_order') || '0', 10);
    const imageFile = formData.get('image'); // File object

    let imageUrl = '';

    if (imageFile && imageFile instanceof File) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const { error: uploadError } = await supabaseAdmin.storage
        .from('team')
        .upload(fileName, buffer, {
          contentType: imageFile.type,
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabaseAdmin.storage.from('team').getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    } else {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
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
