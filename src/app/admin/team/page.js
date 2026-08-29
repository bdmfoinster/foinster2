"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ManageTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [imageFile, setImageFile] = useState(null);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      window.location.href = "/admin/login";
    }
  };

  const fetchTeamMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true });
    
    if (!error && data) setTeamMembers(data);
    setLoading(false);
  };

  useEffect(() => {
    checkUser();
    fetchTeamMembers();
  }, []);

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setName("");
    setRole("");
    setDescription("");
    setIsActive(true);
    setDisplayOrder(teamMembers.length > 0 ? Math.max(...teamMembers.map(m => m.display_order)) + 1 : 1);
    setImageFile(null);
  };

  const handleEditClick = (member) => {
    setIsEditing(true);
    setCurrentId(member.id);
    setName(member.name);
    setRole(member.role);
    setDescription(member.description || "");
    setIsActive(member.is_active);
    setDisplayOrder(member.display_order);
    setImageFile(null); // Require new image if they want to change it
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing && !imageFile) {
      alert("Please select a photo for the new team member.");
      return;
    }

    if (imageFile && imageFile.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5 MB. Please upload a smaller image.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('role', role);
      formData.append('description', description);
      formData.append('is_active', isActive);
      formData.append('display_order', displayOrder);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const url = isEditing ? `/api/admin/team/${currentId}` : '/api/admin/team';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save team member');
      }

      resetForm();
      fetchTeamMembers();
      alert(`Team member ${isEditing ? 'updated' : 'added'} successfully!`);
    } catch (error) {
      alert("Error saving team member: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (member) => {
    if (!confirm(`Are you sure you want to delete ${member.name}? This action cannot be undone.`)) return;
    
    // Optional: Delete image from storage
    if (member.image && member.image.includes('supabase.co')) {
      const urlParts = member.image.split('/');
      const filePath = urlParts[urlParts.length - 1];
      await supabase.storage.from('team').remove([filePath]);
    }

    const response = await fetch(`/api/admin/team/${member.id}`, { method: 'DELETE' });
    if (response.ok) {
      fetchTeamMembers();
    } else {
      alert("Error deleting team member.");
    }
  };

  const moveOrder = async (index, direction) => {
    if (
      (direction === -1 && index === 0) || 
      (direction === 1 && index === teamMembers.length - 1)
    ) return;

    const newTeamMembers = [...teamMembers];
    const targetIndex = index + direction;
    
    // Swap display orders
    const tempOrder = newTeamMembers[index].display_order;
    newTeamMembers[index].display_order = newTeamMembers[targetIndex].display_order;
    newTeamMembers[targetIndex].display_order = tempOrder;

    // Update locally for quick UI feedback
    const sorted = [...newTeamMembers].sort((a, b) => a.display_order - b.display_order);
    setTeamMembers(sorted);

    // Save to DB
    const updates = [
      { id: newTeamMembers[index].id, display_order: newTeamMembers[index].display_order },
      { id: newTeamMembers[targetIndex].id, display_order: newTeamMembers[targetIndex].display_order }
    ];

    const formData = new FormData();
    formData.append('action', 'reorder');
    formData.append('updates', JSON.stringify(updates));

    // We can just use the PUT route with any ID since it handles reorder action globally, 
    // but we need an ID for the URL, so use the first one's ID.
    await fetch(`/api/admin/team/${updates[0].id}`, {
      method: 'PUT',
      body: formData
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-charcoal">Manage Team Members</h1>
        {isEditing && (
          <button onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600">
            Cancel Edit / Add New
          </button>
        )}
      </div>
      
      <div className="bg-white p-6 rounded shadow border border-gray-200 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-primary">{isEditing ? 'Edit Team Member' : 'Add New Team Member'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-primary focus:border-primary"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation/Role *</label>
              <input 
                type="text" 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-primary focus:border-primary"
                placeholder="e.g. Architect"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              rows="3"
              className="w-full p-2 border border-gray-300 rounded focus:ring-primary focus:border-primary"
              placeholder="Short bio or description..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input 
                type="number" 
                value={displayOrder} 
                onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10))} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isActive} 
                  onChange={(e) => setIsActive(e.target.checked)} 
                  className="mr-2 h-4 w-4 text-primary rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Active (Visible on Website)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo {isEditing ? '(Leave empty to keep current photo)' : '*'}
            </label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImageFile(e.target.files[0])} 
              className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50"
            />
          </div>

          <button 
            type="submit" 
            disabled={isUploading}
            className="bg-primary text-white px-6 py-2 rounded font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {isUploading ? "Saving..." : (isEditing ? "Save Changes" : "Add Team Member")}
          </button>
        </form>
      </div>

      <div className="bg-white rounded shadow border border-gray-200 overflow-hidden">
        <h2 className="text-lg font-semibold p-6 bg-gray-50 border-b border-gray-200">Current Team Members</h2>
        
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : teamMembers.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No team members found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="p-4 border-b">Order</th>
                  <th className="p-4 border-b">Photo</th>
                  <th className="p-4 border-b">Name</th>
                  <th className="p-4 border-b">Role</th>
                  <th className="p-4 border-b">Status</th>
                  <th className="p-4 border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member, index) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-b">
                      <div className="flex flex-col items-center justify-center space-y-1 w-8">
                        <button 
                          onClick={() => moveOrder(index, -1)} 
                          disabled={index === 0}
                          className="text-gray-400 hover:text-primary disabled:opacity-30"
                          title="Move Up"
                        >
                          ▲
                        </button>
                        <span className="text-sm font-mono">{member.display_order}</span>
                        <button 
                          onClick={() => moveOrder(index, 1)} 
                          disabled={index === teamMembers.length - 1}
                          className="text-gray-400 hover:text-primary disabled:opacity-30"
                          title="Move Down"
                        >
                          ▼
                        </button>
                      </div>
                    </td>
                    <td className="p-4 border-b">
                      {member.image && (
                        <div className="w-16 h-16 rounded overflow-hidden bg-gray-200 relative">
                          <img src={member.image} alt={member.name} className="object-cover w-full h-full object-center" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 border-b font-medium text-charcoal">{member.name}</td>
                    <td className="p-4 border-b text-gray-600">{member.role}</td>
                    <td className="p-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${member.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {member.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4 border-b text-right space-x-2">
                      <button 
                        onClick={() => handleEditClick(member)}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(member)}
                        className="text-red-500 hover:underline text-sm font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
