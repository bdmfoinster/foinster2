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
  
  const [extendedSettings, setExtendedSettings] = useState({
    heroPrimaryBtnText: "View Projects",
    heroPrimaryBtnUrl: "/projects",
    heroSecondaryBtnText: "Start a Consultation",
    heroSecondaryBtnUrl: "/contact",
    aboutCtaText: "Discover Our Story",
    aboutCtaUrl: "/about",
    projectsSubtitle: "Portfolio",
    projectsTitle: "Featured Projects",
    projectsCtaText: "View All Projects",
    projectsCtaUrl: "/projects",
    servicesSubtitle: "Capabilities",
    servicesTitle: "Our Expertise",
    contactBtnText: "Call Now",
    contactBgImage: "",
    showHero: true,
    showAbout: true,
    showProjects: true,
    showServices: true,
    showContact: true
  });
  
  const [heroImage, setHeroImage] = useState(null);
  const [aboutImage, setAboutImage] = useState(null);
  const [contactBgImage, setContactBgImage] = useState(null);

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
      if (data.extended_settings) {
        setExtendedSettings(prev => ({ ...prev, ...data.extended_settings }));
      }
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

  const handleExtendedChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExtendedSettings(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
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
      payload.append("extended_settings", JSON.stringify(extendedSettings));
      
      if (heroImage) payload.append("hero_image", heroImage);
      if (aboutImage) payload.append("about_image", aboutImage);
      if (contactBgImage) payload.append("contact_bg_image", contactBgImage);
      
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
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-charcoal">Manage Home Page</h1>
      
      <form onSubmit={handleSave} className="space-y-6 md:space-y-8">
        
        {/* HERO SECTION */}
        <div className="bg-white p-6 rounded shadow border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-primary">Hero Section</h2>
            <label className="flex items-center text-sm font-medium cursor-pointer">
              <input type="checkbox" name="showHero" checked={extendedSettings.showHero} onChange={handleExtendedChange} className="mr-2" />
              Show Section
            </label>
          </div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-4 rounded bg-gray-50">
                <h3 className="font-semibold mb-2 text-sm">Primary Button (Left)</h3>
                <label className="block text-xs mb-1">Button Text</label>
                <input type="text" name="heroPrimaryBtnText" value={extendedSettings.heroPrimaryBtnText} onChange={handleExtendedChange} className="w-full border p-2 rounded mb-2 text-sm" />
                <label className="block text-xs mb-1">Button URL</label>
                <input type="text" name="heroPrimaryBtnUrl" value={extendedSettings.heroPrimaryBtnUrl} onChange={handleExtendedChange} className="w-full border p-2 rounded text-sm" />
              </div>
              <div className="border p-4 rounded bg-gray-50">
                <h3 className="font-semibold mb-2 text-sm">Secondary Button (Right)</h3>
                <label className="block text-xs mb-1">Button Text</label>
                <input type="text" name="heroSecondaryBtnText" value={extendedSettings.heroSecondaryBtnText} onChange={handleExtendedChange} className="w-full border p-2 rounded mb-2 text-sm" />
                <label className="block text-xs mb-1">Button URL</label>
                <input type="text" name="heroSecondaryBtnUrl" value={extendedSettings.heroSecondaryBtnUrl} onChange={handleExtendedChange} className="w-full border p-2 rounded text-sm" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Hero Stats</label>
              {heroStats.map((stat, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 mb-3">
                  <input type="text" placeholder="Value (e.g. 15+)" value={stat.value} onChange={(e) => handleStatChange(i, 'value', e.target.value)} className="w-full sm:w-1/3 border p-2 rounded" />
                  <div className="flex gap-2 w-full sm:w-2/3">
                    <input type="text" placeholder="Label (e.g. Years Experience)" value={stat.label} onChange={(e) => handleStatChange(i, 'label', e.target.value)} className="w-full border p-2 rounded" />
                    <button type="button" onClick={() => setHeroStats(heroStats.filter((_, idx) => idx !== i))} className="text-red-500 px-2 hover:bg-red-50 rounded bg-red-50/50">X</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => setHeroStats([...heroStats, { label: "", value: "" }])} className="text-sm text-primary">+ Add Stat</button>
            </div>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div className="bg-white p-6 rounded shadow border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-primary">About Section</h2>
            <label className="flex items-center text-sm font-medium cursor-pointer">
              <input type="checkbox" name="showAbout" checked={extendedSettings.showAbout} onChange={handleExtendedChange} className="mr-2" />
              Show Section
            </label>
          </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Vision Card Title</label>
                <input type="text" name="about_vision_title" value={formData.about_vision_title} onChange={handleInputChange} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vision Card Description</label>
                <input type="text" name="about_vision_desc" value={formData.about_vision_desc} onChange={handleInputChange} className="w-full border p-2 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
              <div>
                <label className="block text-sm font-medium mb-1">CTA Button Text</label>
                <input type="text" name="aboutCtaText" value={extendedSettings.aboutCtaText} onChange={handleExtendedChange} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CTA Button URL</label>
                <input type="text" name="aboutCtaUrl" value={extendedSettings.aboutCtaUrl} onChange={handleExtendedChange} className="w-full border p-2 rounded" />
              </div>
            </div>
          </div>
        </div>
        
        {/* PROJECTS SECTION */}
        <div className="bg-white p-6 rounded shadow border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-primary">Projects Section</h2>
            <label className="flex items-center text-sm font-medium cursor-pointer">
              <input type="checkbox" name="showProjects" checked={extendedSettings.showProjects} onChange={handleExtendedChange} className="mr-2" />
              Show Section
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Section Subtitle</label>
              <input type="text" name="projectsSubtitle" value={extendedSettings.projectsSubtitle} onChange={handleExtendedChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Section Title</label>
              <input type="text" name="projectsTitle" value={extendedSettings.projectsTitle} onChange={handleExtendedChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CTA Link Text</label>
              <input type="text" name="projectsCtaText" value={extendedSettings.projectsCtaText} onChange={handleExtendedChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CTA Link URL</label>
              <input type="text" name="projectsCtaUrl" value={extendedSettings.projectsCtaUrl} onChange={handleExtendedChange} className="w-full border p-2 rounded" />
            </div>
          </div>
        </div>
        
        {/* SERVICES SECTION */}
        <div className="bg-white p-4 md:p-6 rounded shadow border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-primary">Core Services</h2>
            <label className="flex items-center text-sm font-medium cursor-pointer">
              <input type="checkbox" name="showServices" checked={extendedSettings.showServices} onChange={handleExtendedChange} className="mr-2" />
              Show Section
            </label>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Section Subtitle</label>
                <input type="text" name="servicesSubtitle" value={extendedSettings.servicesSubtitle} onChange={handleExtendedChange} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Section Title</label>
                <input type="text" name="servicesTitle" value={extendedSettings.servicesTitle} onChange={handleExtendedChange} className="w-full border p-2 rounded" />
              </div>
            </div>
            {services.map((service, i) => (
              <div key={i} className="flex gap-3 p-3 md:p-4 border rounded bg-gray-50/50 items-start">
                <div className="flex-1 space-y-3">
                  <input type="text" placeholder="Service Title" value={service.title} onChange={(e) => handleServiceChange(i, 'title', e.target.value)} className="w-full border p-2 rounded text-sm bg-white" />
                  <textarea placeholder="Service Description" rows="2" value={service.desc} onChange={(e) => handleServiceChange(i, 'desc', e.target.value)} className="w-full border p-2 rounded text-sm bg-white"></textarea>
                </div>
                <button type="button" onClick={() => setServices(services.filter((_, idx) => idx !== i))} className="text-red-500 px-3 py-1 hover:bg-red-100 rounded bg-red-50 transition-colors">X</button>
              </div>
            ))}
            <button type="button" onClick={() => setServices([...services, { title: "", desc: "" }])} className="text-sm font-medium text-primary hover:underline">+ Add Service</button>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="bg-white p-6 rounded shadow border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-primary">Contact / CTA Section</h2>
            <label className="flex items-center text-sm font-medium cursor-pointer">
              <input type="checkbox" name="showContact" checked={extendedSettings.showContact} onChange={handleExtendedChange} className="mr-2" />
              Show Section
            </label>
          </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Button Text</label>
                <input type="text" name="contactBtnText" value={extendedSettings.contactBtnText} onChange={handleExtendedChange} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Background Logo / Watermark</label>
                {extendedSettings.contactBgImage && <img src={extendedSettings.contactBgImage} alt="Bg" className="h-20 mb-2 rounded object-contain bg-gray-100 p-2" />}
                <input type="file" accept="image/*" onChange={(e) => setContactBgImage(e.target.files[0])} className="w-full border p-2 rounded text-sm" />
              </div>
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
