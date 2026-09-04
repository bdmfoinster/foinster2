import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Parse form data
    const heroTitle = formData.get('hero_title');
    const heroDescription = formData.get('hero_description');
    const heroStatsStr = formData.get('hero_stats'); // JSON string
    const aboutTitle = formData.get('about_title');
    const aboutDescription = formData.get('about_description');
    const aboutVisionTitle = formData.get('about_vision_title');
    const aboutVisionDesc = formData.get('about_vision_desc');
    const servicesStr = formData.get('services'); // JSON string
    const contactTitle = formData.get('contact_title');
    const contactDescription = formData.get('contact_description');
    const contactPhone = formData.get('contact_phone');
    
    let heroImageUrl = formData.get('hero_image_url_existing');
    let aboutImageUrl = formData.get('about_image_url_existing');

    const heroImageFile = formData.get('hero_image');
    const aboutImageFile = formData.get('about_image');
    
    // NEW: Handle extended settings
    let extendedSettings = {};
    const extendedSettingsStr = formData.get('extended_settings');
    try { if (extendedSettingsStr) extendedSettings = JSON.parse(extendedSettingsStr); } catch (e) {}
    
    const contactBgImageFile = formData.get('contact_bg_image');

    // Upload hero image if new file is provided
    if (heroImageFile && typeof heroImageFile !== 'string') {
      const fileExt = heroImageFile.name.split('.').pop();
      const fileName = `hero_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from('images')
        .upload(`homepage/${fileName}`, heroImageFile);
        
      if (!uploadError) {
        const { data: { publicUrl } } = supabaseAdmin.storage
          .from('images')
          .getPublicUrl(`homepage/${fileName}`);
        heroImageUrl = publicUrl;
      }
    }

    // Upload about image if new file is provided
    if (aboutImageFile && typeof aboutImageFile !== 'string') {
      const fileExt = aboutImageFile.name.split('.').pop();
      const fileName = `about_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from('images')
        .upload(`homepage/${fileName}`, aboutImageFile);
        
      if (!uploadError) {
        const { data: { publicUrl } } = supabaseAdmin.storage
          .from('images')
          .getPublicUrl(`homepage/${fileName}`);
        aboutImageUrl = publicUrl;
      }
    }
    
    // Upload contact background image if new file is provided
    if (contactBgImageFile && typeof contactBgImageFile !== 'string') {
      const fileExt = contactBgImageFile.name.split('.').pop();
      const fileName = `contact_bg_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from('images')
        .upload(`homepage/${fileName}`, contactBgImageFile);
        
      if (!uploadError) {
        const { data: { publicUrl } } = supabaseAdmin.storage
          .from('images')
          .getPublicUrl(`homepage/${fileName}`);
        extendedSettings.contactBgImage = publicUrl;
      }
    }
    
    // Upload featured project images
    if (extendedSettings.featured_projects && Array.isArray(extendedSettings.featured_projects)) {
      for (let i = 0; i < extendedSettings.featured_projects.length; i++) {
        const fpFile = formData.get(`featured_project_image_${i}`);
        if (fpFile && typeof fpFile !== 'string') {
          const fileExt = fpFile.name.split('.').pop();
          const fileName = `featured_project_${Date.now()}_${i}.${fileExt}`;
          const { error: uploadError } = await supabaseAdmin.storage
            .from('images')
            .upload(`homepage/${fileName}`, fpFile);
            
          if (!uploadError) {
            const { data: { publicUrl } } = supabaseAdmin.storage
              .from('images')
              .getPublicUrl(`homepage/${fileName}`);
            extendedSettings.featured_projects[i].image_url = publicUrl;
          }
        }
      }
    }
    
    let heroStats = [];
    try { if (heroStatsStr) heroStats = JSON.parse(heroStatsStr); } catch (e) {}

    let services = [];
    try { if (servicesStr) services = JSON.parse(servicesStr); } catch (e) {}

    const payload = {
      hero_title: heroTitle,
      hero_description: heroDescription,
      hero_stats: heroStats,
      about_title: aboutTitle,
      about_description: aboutDescription,
      about_vision_title: aboutVisionTitle,
      about_vision_desc: aboutVisionDesc,
      hero_image_url: heroImageUrl,
      about_image_url: aboutImageUrl,
      services: services,
      contact_title: contactTitle,
      contact_description: contactDescription,
      contact_phone: contactPhone,
      extended_settings: extendedSettings
    };

    // Check if row exists
    const { data: existing } = await supabaseAdmin.from('homepage_content').select('id').limit(1).single();

    let dbError;
    if (existing && existing.id) {
      const result = await supabaseAdmin.from('homepage_content').update(payload).eq('id', existing.id);
      dbError = result.error;
    } else {
      const result = await supabaseAdmin.from('homepage_content').insert([payload]);
      dbError = result.error;
    }

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Database: " + dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error: " + error.message }, { status: 500 });
  }
}
