"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ManagePages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const fetchPages = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("pages").select("*").order("slug");
    if (!error && data) setPages(data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPages();
  }, []);

  const handleEdit = (page) => {
    setEditingId(page.id);
    setEditContent(JSON.stringify(page.content, null, 2));
  };

  const handleSave = async (id) => {
    try {
      const parsedContent = JSON.parse(editContent);
      const { error } = await supabase.from("pages").update({ content: parsedContent }).eq("id", id);
      if (error) throw error;
      setEditingId(null);
      fetchPages();
    } catch (err) {
      alert("Invalid JSON or error saving: " + err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-charcoal">Manage Static Pages</h1>
      <p className="text-gray-600 mb-8">Edit the JSON structure of your Home and About pages. Make sure the JSON format is valid.</p>

      {loading ? (
        <p>Loading pages...</p>
      ) : (
        <div className="space-y-6">
          {pages.map((page) => (
            <div key={page.id} className="bg-white p-6 rounded shadow border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 uppercase tracking-widest text-primary">{page.slug} Page</h2>
              
              {editingId === page.id ? (
                <div>
                  <textarea
                    className="w-full h-64 font-mono text-sm border p-4 rounded mb-4"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="flex space-x-4">
                    <button onClick={() => handleSave(page.id)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save Changes</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto mb-4 border border-gray-200">
                    {JSON.stringify(page.content, null, 2)}
                  </pre>
                  <button onClick={() => handleEdit(page)} className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">Edit Content</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
