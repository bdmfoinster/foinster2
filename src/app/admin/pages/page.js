"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ManagePages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState({});

  const fetchPages = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("pages").select("*").order("slug");
    if (!error && data) setPages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleEdit = (page) => {
    setEditingId(page.id);
    setEditContent(page.content || {});
  };

  const handleSave = async (id) => {
    try {
      const { error } = await supabase.from("pages").update({ content: editContent }).eq("id", id);
      if (error) throw error;
      setEditingId(null);
      fetchPages();
    } catch (err) {
      alert("Error saving: " + err.message);
    }
  };

  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-charcoal">Manage Static Pages</h1>
      <p className="text-gray-600 mb-8">Edit the content of your static pages.</p>

      {loading ? (
        <p>Loading pages...</p>
      ) : (
        <div className="space-y-6">
          {pages.map((page) => (
            <div key={page.id} className="bg-white p-6 rounded shadow border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 uppercase tracking-widest text-primary">{page.slug} Page</h2>
              
              {editingId === page.id ? (
                <div>
                  <div className="mb-6 space-y-4">
                    {Object.entries(editContent).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {formatKey(key)}
                        </label>
                        {value && value.length > 60 ? (
                           <textarea
                           className="w-full border p-2 rounded focus:ring-primary focus:border-primary"
                           value={value}
                           onChange={(e) => setEditContent({ ...editContent, [key]: e.target.value })}
                           rows={4}
                         />
                        ) : (
                          <input
                            type="text"
                            className="w-full border p-2 rounded focus:ring-primary focus:border-primary"
                            value={value}
                            onChange={(e) => setEditContent({ ...editContent, [key]: e.target.value })}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <button onClick={() => handleSave(page.id)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save Changes</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="bg-gray-50 p-4 rounded mb-4 border border-gray-200 space-y-4">
                    {Object.entries(page.content || {}).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-semibold text-gray-700 block mb-1">{formatKey(key)}</span>
                        <p className="text-gray-600 bg-white p-3 border rounded shadow-sm">{value}</p>
                      </div>
                    ))}
                  </div>
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
