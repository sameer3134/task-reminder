"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    photo: "", // Will hold Cloudinary URL
  });
  const [uploading, setUploading] = useState(false);
const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cloud_image"); // 🔁 Change this

    setUploading(true);
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwvocld29/image/upload", // 🔁 Change this
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log("url",data)
      setForm((prev) => ({ ...prev, photo: data.secure_url }));
    } catch (err) {
      console.error("Upload error", err);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      alert("Registered successfully!");
  
      router.push("/");
      window.location.href = "/login";
    } catch (err: any) {
      alert(err.message);
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mb-4"
        />
        {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}
        {form.photo && (
          <Image
            src={form.photo}
            alt="Uploaded"
            height={240}
            width={240}
            className="w-24 h-24 object-cover mb-4 rounded-full"
          />
        )}

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
