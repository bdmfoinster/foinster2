require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const teamMembers = [
  { name: "Faisal Babu", role: "Executive Director", image: "/team/Faisal Babu - Executive Director.jpg" },
  { name: "Khaja Hussain", role: "CEO", image: "/team/Khaja hussain - CEO.jpg" },
  { name: "Shanib", role: "BDM", image: "/team/Shanib - BDM.jpg" },
  { name: "Rahul", role: "Design Manager", image: "/team/Rahul - Design Manager.jpg" },
  { name: "Anjana", role: "Accounts Manager", image: "/team/Anjana - Accounts Manager.jpg" },
  { name: "Athira", role: "HR Executive", image: "/team/Athira - HR Executive.jpg" },
  { name: "Sukanya", role: "CRM", image: "/team/Sukanya - CRM.jpg" },
  { name: "Kadeeja Shaibi", role: "Architect", image: "/team/Kadeeja Shaibi - Architect.jpg" },
  { name: "Sooraj", role: "Senior Designer", image: "/team/Sooraj - Senior Designer.jpg" },
  { name: "Adhil", role: "Junior Designer", image: "/team/Adhil - Junior Designer.jpg" },
  { name: "Fayas", role: "Junior Designer", image: "/team/Fayas - Junior Designer.jpg" },
  { name: "Junaid", role: "3D Visualizer", image: "/team/Junaid - 3D Visualizer.jpg" },
  { name: "Unni Mohandas", role: "3D Visualizer", image: "/team/Unni Mohandas - 3D Visualizer.jpg" },
  { name: "Shifana", role: "2D Detailer", image: "/team/Shifana - 2D Detailer.jpg" },
  { name: "Noushad", role: "Senior Accountant", image: "/team/Noushad - Senior Accountant.jpg" },
  { name: "Akhil", role: "Site Supervisor", image: "/team/Akhil - Site Supervisor.jpg" },
  { name: "Goutham", role: "Site Supervisor", image: "/team/Goutham - Site Supervisor.jpg" },
  { name: "Murshid", role: "Site Supervisor", image: "/team/Murshid - Site Supervisor.jpg" },
  { name: "Shamil", role: "Site Supervisor", image: "/team/Shamil - Site supervisor.jpg" },
  { name: "Swalih", role: "Site Supervisor", image: "/team/Swalih - Site Supervisor.jpg" },
  { name: "Mubasheer", role: "Project Manager", image: "/team/Mubasheer - Project Manager.jpeg", description: "Expertly coordinates complex architectural projects from inception to execution. Ensures seamless client communication, rigorous scheduling, and strict quality control across multidisciplinary teams." },
  { name: "Abhijith", role: "Design Trainee", image: "/team/Abhijith - Design Trainee.jpeg", description: "Assists senior architects in conceptual drafting and comprehensive design development. Specializes in advanced CAD/BIM workflows while maintaining a strong commitment to continuous learning and technical documentation." },
  { name: "Sibindas", role: "Design Trainee", image: "/team/Sibindas - Design Trainee.jpeg", description: "Supports the design team with precise architectural drafting and project visualization. Actively applies CAD/BIM techniques to assist in design development and technical documentation while focused on continuous professional growth." }
];

async function run() {
  console.log('Creating team_members table if not exists...');
  
  const { error: checkError } = await supabase.from('team_members').select('id').limit(1);
  if (checkError && checkError.code === '42P01') {
    console.error('ERROR: Table "team_members" does not exist.');
    console.log(`
Please run this SQL in your Supabase SQL Editor:

CREATE TABLE public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    description TEXT,
    image TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optional: Enable RLS and create policies
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.team_members FOR SELECT USING (true);

INSERT INTO storage.buckets (id, name, public) VALUES ('team', 'team', true);
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'team' );
CREATE POLICY "Admin Insert" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'team' );
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE USING ( bucket_id = 'team' );
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING ( bucket_id = 'team' );
`);
    process.exit(1);
  }

  // Ensure bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.find(b => b.name === 'team')) {
    console.log('Creating "team" bucket...');
    const { error: bucketError } = await supabase.storage.createBucket('team', { public: true });
    if (bucketError) {
      console.error('Failed to create bucket:', bucketError);
      process.exit(1);
    }
  }

  // Clear existing to avoid duplicates if re-run
  await supabase.from('team_members').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // delete all

  for (let i = 0; i < teamMembers.length; i++) {
    const member = teamMembers[i];
    console.log(`Processing ${member.name}...`);
    
    const imagePath = path.join(__dirname, 'public', member.image);
    
    let publicUrl = '';
    
    if (fs.existsSync(imagePath)) {
      const fileName = path.basename(imagePath);
      const fileBuffer = fs.readFileSync(imagePath);
      
      const { data, error } = await supabase.storage
        .from('team')
        .upload(fileName, fileBuffer, {
          upsert: true,
          contentType: 'image/jpeg' 
        });
        
      if (error) {
        console.error(`Failed to upload image for ${member.name}:`, error);
        continue;
      }
      
      const { data: urlData } = supabase.storage.from('team').getPublicUrl(fileName);
      publicUrl = urlData.publicUrl;
    } else {
      console.warn(`Image not found locally for ${member.name}: ${imagePath}`);
      publicUrl = member.image; 
    }
    
    const { error: insertError } = await supabase.from('team_members').insert([{
      name: member.name,
      role: member.role,
      description: member.description || null,
      image: publicUrl,
      display_order: i + 1,
      is_active: true
    }]);
    
    if (insertError) {
      console.error(`Failed to insert ${member.name}:`, insertError);
    } else {
      console.log(`Successfully migrated ${member.name}`);
    }
  }
  console.log('Migration complete!');
}

run();
