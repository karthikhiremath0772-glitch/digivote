import React, { useState } from 'react';
// import EditCandidateForm from './EditCandidateForm';


export default function EditCandidateForm({ candidate, onSave }) {
  const [form, setForm] = useState({ ...candidate });
  const [photoPreview, setPhotoPreview] = useState(form.photo ? `/images/${form.photo}` : null);
  const [logoPreview, setLogoPreview] = useState(form.partyLogo ? `/images/${form.partyLogo}` : null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setForm({ ...form, [name]: data.filename });

      if (name === "photo") {
        setPhotoPreview(`/images/${data.filename}`);
      } else if (name === "partyLogo") {
        setLogoPreview(`/images/${data.filename}`);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Candidate Profile</h3>

      <label>Name:</label>
      <input name="name" value={form.name} onChange={handleChange} />

      <label>Party:</label>
      <input name="party" value={form.party} onChange={handleChange} />

      <label>Description:</label>
      <textarea name="description" value={form.description} onChange={handleChange} />

      <label>Upload Profile Photo:</label>
      <input type="file" name="photo" onChange={handleFileChange} />
      {photoPreview && <div>Profile Preview<br /><img src={photoPreview} alt="Preview" width={100} /></div>}

      <label>Upload Party Logo:</label>
      <input type="file" name="partyLogo" onChange={handleFileChange} />
      {logoPreview && <div>Logo Preview<br /><img src={logoPreview} alt="Logo Preview" width={60} /></div>}

      <button type="submit">✅ Save & Confirm</button>
    </form>
  );
}
