"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ManageHomePage() {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    hero_title: "",
    hero_description: "",
    about_title: "",
    about_description: "",
    about_vision_title: "",
    about_vision_desc: "",
    contact_title: "",
    contact_description: "",
    contact_phone: "",
    hero_image_url_existing: "",
    about_image_url_existing: ""
  });
  
  const [heroImage, setHeroImage] = useState(null);
  const [aboutImage, setAboutImage] = useState(null);

  const [heroStats, setHeroStats] = useState([
    { label: "Years Experience", value: "15+" },
    { label: "Projects", value: "200+" },
    { label: "Reach", value: "Global Reach" }
  ]);
  
  const [services, setServices] = useState([
    { title: "Architectural Design", desc: "Concept development for homes..." },
    { title: "Turnkey Civil Construction", desc: "Full-scale project execution..." }
  ]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      window.location.href = "/admin/login";
    }
  };

  const fetchContent = async () => {
    setLoading(true);
    const res = await fetch("/api/homepage");
    const json = await res.json();
    
    if (json.success && json.data) {
      const data = json.data;
      setFormData({
        hero_title: data.hero_title || "",
        hero_description: data.hero_description || "",
        about_title: data.about_title || "",
        about_description: data.about_description || "",
        about_vision_title: data.about_vision_title || "",
        about_vision_desc: data.about_vision_desc || "",
        contact_title: data.contact_title || "",
        contact_description: data.contact_description || "",
        contact_phone: data.contact_phone || "",
        hero_image_url_existing: data.hero_image_url || "",
        about_image_url_existing: data.about_image_url || ""
      });
      if (data.hero_stats && Array.isArray(data.hero_stats)) setHeroStats(data.hero_stats);
      if (data.services && Array.isArray(data.services)) setServices(data.services);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkUser();
    fetchContent();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...heroStats];
    newStats[index][field] = value;
    setHeroStats(newStats);
  };
  
  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const payload = new FormData();
      Object.keys(formData).forEach(key => {
        payload.append(key, formData[key]);
      });
      
      payload.append("hero_stats", JSON.stringify(heroStats));
      payload.append("services", JSON.stringify(services));
      
      if (heroImage) payload.append("hero_image", heroImage);
      if (aboutImage) payload.append("about_image", aboutImage);
      
      const response = await fetch("/api/admin/homepage", {
        method: "POST",
        body: payload
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to save");
      
      alert("Home Page Content Updated!");
      fetchContent();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading content...</div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-charcoal">Manage Home Page</h1>
      
      <form onSubmit={handleSave} className="space-y-8">
        
        {/* HERO SECTION */}
        <div className="bg-white p-6 rounded shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-primary">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Hero Title</label>
              <input type="text" name="hero_title" value={formData.hero_title} onChange={handleInputChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hero Description</label>
              <textarea name="hero_description" rows="3" value={formData.hero_description} onChange={handleInputChange} className="w-full border p-2 rounded"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hero Background Image</label>
              {formData.hero_image_url_existing && <img src={formData.hero_image_url_existing} alt="Hero" className="h-32 mb-2 rounded" />}
              <input type="file" accept="image/*" onChange={(e) => setHeroImage(e.target.files[0])} className="w-full border p-2 rounded" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Hero Stats</label>
              {heroStats.map((stat, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="text" placeholder="Value (e.g. 15+)" value={stat.value} onChange={(e) => handleStatChange(i, 'value', e.target.value)} className="w-1/3 border p-2 rounded" />
                  <input type="text" placeholder="Label (e.g. Years Experience)" value={stat.label} onChange={(e) => handleStatChange(i, 'label', e.target.value)} className="w-2/3 border p-2 rounded" />
                </div>
              ))}
              <button type="button" onClick={() => setHeroStats([...heroStats, { label: "", value: "" }])} className="text-sm text-primary">+ Add Stat</button>
            </div>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div className="bg-white p-6 rounded shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-primary">About Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">About Title</label>
              <input type="text" name="about_title" value={formData.about_title} onChange={handleInputChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">About Description (Paragraphs)</label>
              <textarea name="about_description" rows="4" value={formData.about_description} onChange={handleInputChange} className="w-full border p-2 rounded"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">About Side Image</label>
              {formData.about_image_url_existing && <img src={formData.about_image_url_existing} alt="About" className="h-32 mb-2 rounded" />}
              <input type="file" accept="image/*" onChange={(e) => setAboutImage(e.target.files[0])} className="w-full border p-2 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Vision Card Title</label>
                <input type="text" name="about_vision_title" value={formData.about_vision_title} onChange={handleInputChange} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vision Card Description</label>
                <input type="text" name="about_vision_desc" value={formData.about_vision_desc} onChange={handleInputChange} className="w-full border p-2 rounded" />
              </div>
            </div>
          </div>
        </div>
        
        {/* SERVICES SECTION */}
        <div className="bg-white p-6 rounded shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-primary">Core Services</h2>
          <div className="space-y-4">
            {services.map((service, i) => (
              <div key={i} className="flex gap-2 p-3 border rounded">
                <div className="flex-1 space-y-2">
                  <input type="text" placeholder="Service Title" value={service.title} onChange={(e) => handleServiceChange(i, 'title', e.target.value)} className="w-full border p-2 rounded text-sm" />
                  <textarea placeholder="Service Description" rows="2" value={service.desc} onChange={(e) => handleServiceChange(i, 'desc', e.target.value)} className="w-full border p-2 rounded text-sm"></textarea>
                </div>
                <button type="button" onClick={() => setServices(services.filter((_, idx) => idx !== i))} className="text-red-500 px-2">X</button>
              </div>
            ))}
            <button type="button" onClick={() => setServices([...services, { title: "", desc: "" }])} className="text-sm text-primary">+ Add Service</button>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="bg-white p-6 rounded shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-primary">Contact / CTA Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Contact CTA Title</label>
              <input type="text" name="contact_title" value={formData.contact_title} onChange={handleInputChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact CTA Description</label>
              <textarea name="contact_description" rows="2" value={formData.contact_description} onChange={handleInputChange} className="w-full border p-2 rounded"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number (with country code)</label>
              <input type="text" name="contact_phone" value={formData.contact_phone} onChange={handleInputChange} className="w-full border p-2 rounded" />
            </div>
          </div>
        </div>

        <button type="submit" disabled={isSaving} className="bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 disabled:opacity-50 text-lg w-full font-semibold">
          {isSaving ? "Saving..." : "Save Home Page Content"}
        </button>

      </form>
    </div>
  );
}
