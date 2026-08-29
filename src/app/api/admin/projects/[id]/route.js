import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    
    const title = formData.get('title');
    const category = formData.get('category');
    const imageFile = formData.get('file');

    const updateData = { title, category };

    if (imageFile && imageFile !== 'undefined' && imageFile !== 'null') {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const { error: uploadError } = await supabaseAdmin.storage
        .from('images')
        .upload(`projects/${fileName}`, buffer, {
          contentType: imageFile.type,
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabaseAdmin.storage.from('images').getPublicUrl(`projects/${fileName}`);
      updateData.image_url = urlData.publicUrl;
    }

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
