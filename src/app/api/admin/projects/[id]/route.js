import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
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

      if (!image_url && imageFile && imageFile !== 'undefined' && imageFile !== 'null') {
        const fileExt = imageFile.name ? imageFile.name.split('.').pop() : 'jpg';
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const buffer = Buffer.from(await imageFile.arrayBuffer());

        const { error: uploadError } = await supabaseAdmin.storage
          .from('images')
          .upload(`projects/${fileName}`, buffer, {
            contentType: imageFile.type || 'image/jpeg',
            upsert: true
          });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabaseAdmin.storage.from('images').getPublicUrl(`projects/${fileName}`);
        image_url = urlData.publicUrl;
      }
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (category !== undefined) updateData.category = category;
    if (image_url) updateData.image_url = image_url;

    const { data, error } = await supabaseAdmin
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return NextResponse.json({ success: true, data: data[0] });

  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const { error } = await supabaseAdmin.from('projects').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
