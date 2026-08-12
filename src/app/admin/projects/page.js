"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Residential");
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    checkUser();
    fetchProjects();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      window.location.href = "/admin/login";
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (!error && data) setProjects(data);
    setLoading(false);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image file first.");
      return;
    }

    // Enforce 10 MB limit
    if (imageFile.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10 MB. Please upload a smaller image.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('file', imageFile);

      // 3. Save project to database using API route to bypass RLS
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save project');
      }

      setTitle("");
      setImageFile(null);
      fetchProjects();
      alert("Project added successfully!");
    } catch (error) {
      alert("Error adding project: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (project) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    // Optional: Delete image from storage as well
    if (project.image_url && project.image_url.includes('supabase.co')) {
      const urlParts = project.image_url.split('/');
      const filePath = `projects/${urlParts[urlParts.length - 1]}`;
      await supabase.storage.from('images').remove([filePath]);
    }

    const { error } = await supabase.from("projects").delete().eq("id", project.id);
    if (!error) {
      fetchProjects();
    } else {
      alert("Error deleting project.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-charcoal">Manage Projects</h1>
      
      <div className="bg-white p-6 rounded shadow border border-gray-200 mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Project</h2>
        <form onSubmit={handleAddProject} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border p-2 rounded">
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Interior">Interior</option>
                <option value="Exterior">Exterior</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Project Image File</label>
            <input 
              type="file" 
              accept="image/*"
              required 
              onChange={(e) => setImageFile(e.target.files[0])} 
              className="w-full border p-2 rounded bg-gray-50" 
            />
          </div>
          <button type="submit" disabled={isUploading} className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary/90 disabled:opacity-50">
            {isUploading ? "Uploading & Saving..." : "Add Project"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded shadow border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 text-sm font-semibold">Title</th>
              <th className="p-4 text-sm font-semibold">Category</th>
              <th className="p-4 text-sm font-semibold">Image</th>
              <th className="p-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="p-4 text-center">Loading...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan="4" className="p-4 text-center">No projects found.</td></tr>
            ) : (
              projects.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4">{p.title}</td>
                  <td className="p-4">{p.category}</td>
                  <td className="p-4"><img src={p.image_url} alt={p.title} className="w-16 h-16 object-cover rounded" /></td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(p)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
