import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const contentType = request.headers.get('content-type') || '';
    let updateData = {};

    if (contentType.includes('application/json')) {
      const json = await request.json();
      
      if (json.action === 'reorder' && json.updates) {
        for (const update of json.updates) {
          await supabaseAdmin
            .from('team_members')
            .update({ display_order: update.display_order })
            .eq('id', update.id);
        }
        return NextResponse.json({ success: true });
      }

      if (json.name !== undefined) updateData.name = json.name;
      if (json.role !== undefined) updateData.role = json.role;
      if (json.description !== undefined) updateData.description = json.description;
      if (json.is_active !== undefined) updateData.is_active = Boolean(json.is_active);
      if (json.display_order !== undefined) updateData.display_order = parseInt(json.display_order, 10);
      if (json.image) updateData.image = json.image;

    } else {
      const formData = await request.formData();
      const isReorder = formData.has('action') && formData.get('action') === 'reorder';
      
      if (isReorder) {
        const updates = JSON.parse(formData.get('updates'));
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
      const imageUrl = formData.get('image_url');

      updateData = { name, role, description, is_active, display_order };
      if (imageUrl) updateData.image = imageUrl;

      if (!imageUrl && imageFile && imageFile instanceof File) {
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
    const { id } = await params;
    
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
