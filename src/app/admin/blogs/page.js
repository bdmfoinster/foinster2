"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [date, setDate] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      window.location.href = "/admin/login";
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (!error && data) setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBlogs();
  }, []);

  const handleAddBlog = async (e) => {
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
      formData.append('excerpt', excerpt);
      formData.append('content', content);
      formData.append('date', date);
      formData.append('file', imageFile);

      // 3. Save blog and upload image to database using API route to bypass RLS
      const response = await fetch('/api/admin/blogs', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save blog');
      }

      setTitle("");
      setExcerpt("");
      setContent("");
      setImageFile(null);
      setDate("");
      fetchBlogs();
      alert("Blog published successfully!");
    } catch (error) {
      alert("Error adding blog: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (blog) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    if (blog.image_url && blog.image_url.includes('supabase.co')) {
      const urlParts = blog.image_url.split('/');
      const filePath = `blogs/${urlParts[urlParts.length - 1]}`;
      await supabase.storage.from('images').remove([filePath]);
    }

    const { error } = await supabase.from("blogs").delete().eq("id", blog.id);
    if (!error) {
      fetchBlogs();
    } else {
      alert("Error deleting blog.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-charcoal">Manage Blogs</h1>
      
      <div className="bg-white p-6 rounded shadow border border-gray-200 mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Blog Post</h2>
        <form onSubmit={handleAddBlog} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date (e.g. August 24, 2026)</label>
              <input type="text" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full border p-2 rounded" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt (Short summary)</label>
            <input type="text" required value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Full Content</label>
            <textarea required value={content} onChange={(e) => setContent(e.target.value)} className="w-full border p-2 rounded h-32" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Blog Image File</label>
            <input 
              type="file" 
              accept="image/*"
              required 
              onChange={(e) => setImageFile(e.target.files[0])} 
              className="w-full border p-2 rounded bg-gray-50" 
            />
          </div>
          <button type="submit" disabled={isUploading} className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary/90 disabled:opacity-50">
            {isUploading ? "Uploading & Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded shadow border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 text-sm font-semibold">Title</th>
              <th className="p-4 text-sm font-semibold">Date</th>
              <th className="p-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3" className="p-4 text-center">Loading...</td></tr>
            ) : blogs.length === 0 ? (
              <tr><td colSpan="3" className="p-4 text-center">No blogs found.</td></tr>
            ) : (
              blogs.map((b) => (
                <tr key={b.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4 font-medium">{b.title}</td>
                  <td className="p-4 text-gray-600">{b.date}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(b)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
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
