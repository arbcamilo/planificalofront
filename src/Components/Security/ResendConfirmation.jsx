// src/components/ResendConfirmation.js
import React, { useState } from "react";
import axios from "axios";

const ResendConfirmation = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/auth/resend-confirmation", { email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Resend Confirmation Email</button>
    </form>
  );
};

export default ResendConfirmation;
