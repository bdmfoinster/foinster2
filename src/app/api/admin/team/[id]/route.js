import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const id = params.id;
    const formData = await request.formData();
    
    // Check if it's a reorder action or status toggle which might send limited data
    const isReorder = formData.has('action') && formData.get('action') === 'reorder';
    
    if (isReorder) {
      const updates = JSON.parse(formData.get('updates'));
      // updates is an array of { id, display_order }
      for (const update of updates) {
        await supabaseAdmin
          .from('team_members')
          .update({ display_order: update.display_order })
          .eq('id', update.id);
      }
      return NextResponse.json({ success: true });
    }

    const name = formData.get('name');
    const role = formData.get('role');
    const description = formData.get('description') || null;
    const is_active = formData.get('is_active') === 'true';
    const display_order = parseInt(formData.get('display_order') || '0', 10);
    const imageFile = formData.get('image'); 

    const updateData = {
      name,
      role,
      description,
      is_active,
      display_order
    };

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
      updateData.image = urlData.publicUrl;
    }

    const { data, error } = await supabaseAdmin
      .from('team_members')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return NextResponse.json({ success: true, data: data[0] });

  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    
    const { error } = await supabaseAdmin
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
