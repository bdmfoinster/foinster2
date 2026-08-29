"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        setSession(session);
      }
    });
  }, [router]);

  if (!session) return <div className="p-8">Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-charcoal">Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome to the FOINSTER CMS. Select a section from the sidebar to manage your content.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow border border-gray-200">
          <h3 className="text-xl font-semibold mb-2">Pages</h3>
          <p className="text-sm text-gray-500 mb-4">Edit the text content on your Home and About pages.</p>
          <button onClick={() => router.push('/admin/pages')} className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary/90">Manage Pages</button>
        </div>
        
        <div className="bg-white p-6 rounded shadow border border-gray-200">
          <h3 className="text-xl font-semibold mb-2">Projects</h3>
          <p className="text-sm text-gray-500 mb-4">Add, edit, or remove projects from your portfolio.</p>
          <button onClick={() => router.push('/admin/projects')} className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary/90">Manage Projects</button>
        </div>
        
        <div className="bg-white p-6 rounded shadow border border-gray-200">
          <h3 className="text-xl font-semibold mb-2">Blogs</h3>
          <p className="text-sm text-gray-500 mb-4">Write new blog posts and manage existing ones.</p>
          <button onClick={() => router.push('/admin/blogs')} className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary/90">Manage Blogs</button>
        </div>
        
        <div className="bg-white p-6 rounded shadow border border-gray-200">
          <h3 className="text-xl font-semibold mb-2">Meet Our Team</h3>
          <p className="text-sm text-gray-500 mb-4">Manage team members on the About page.</p>
          <button onClick={() => router.push('/admin/team')} className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary/90">Manage Team</button>
        </div>
      </div>
    </div>
  );
}
