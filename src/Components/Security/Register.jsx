import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    documentType: "",
    userType: 0,
    photo: null,
    userStatus: "Active",
    birthDate: "",
    accountCreationDate: "",
    fullName: "",
    userName: "",
    normalizedUserName: "",
    email: "",
    normalizedEmail: "",
    emailConfirmed: false,
    passwordHash: "",
    securityStamp: "",
    concurrencyStamp: "",
    phoneNumber: null,
    phoneNumberConfirmed: false,
    twoFactorEnabled: false,
    lockoutEnd: null,
    lockoutEnabled: true,
    accessFailedCount: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    await axios.post("/api/admin/Users/CreateUser", data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="text"
        name="documentType"
        value={formData.documentType}
        onChange={handleChange}
        placeholder="Document Type"
      />
      <input
        type="number"
        name="userType"
        value={formData.userType}
        onChange={handleChange}
        placeholder="User Type"
      />
      <input type="file" name="photo" onChange={handleFileChange} />
      <input
        type="text"
        name="userStatus"
        value={formData.userStatus}
        onChange={handleChange}
        placeholder="User Status"
      />
      <input
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
        placeholder="Birth Date"
      />
      <input
        type="date"
        name="accountCreationDate"
        value={formData.accountCreationDate}
        onChange={handleChange}
        placeholder="Account Creation Date"
      />
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
      />
      <input
        type="email"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        placeholder="User Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="passwordHash"
        value={formData.passwordHash}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
