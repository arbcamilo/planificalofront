// src/components/EditUser.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";

const EditUser = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: user.email,
    profilePicture: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", formData.email);
    data.append("profilePicture", formData.profilePicture);

    await axios.put("/api/auth/edit", data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input type="file" name="profilePicture" onChange={handleFileChange} />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditUser;
