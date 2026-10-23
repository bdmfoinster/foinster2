"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { safeFetchJson } from "@/lib/imageOptimizer";
import { uploadDirectToStorage } from "@/lib/directUploader";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [date, setDate] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = useRef(null);

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

    setIsUploading(true);

    try {
      setUploadStatus("Uploading image to storage...");
      const imageUrl = await uploadDirectToStorage(imageFile, { bucket: 'images', folder: 'blogs' });

      setUploadStatus("Publishing blog post...");

      const response = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          date,
          image_url: imageUrl
        }),
      });

      await safeFetchJson(response, 'Failed to save blog');

      setTitle("");
      setExcerpt("");
      setContent("");
      setImageFile(null);
      setDate("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      fetchBlogs();
      alert("Blog published successfully!");
    } catch (error) {
      alert("Error adding blog: " + error.message);
    } finally {
      setIsUploading(false);
      setUploadStatus("");
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
              ref={fileInputRef}
              type="file" 
              accept="image/*"
              required 
              onChange={(e) => setImageFile(e.target.files[0])} 
              className="w-full border p-2 rounded bg-gray-50" 
            />
          </div>
          <button type="submit" disabled={isUploading} className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary/90 disabled:opacity-50">
            {isUploading ? (uploadStatus || "Publishing...") : "Publish Blog"}
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
