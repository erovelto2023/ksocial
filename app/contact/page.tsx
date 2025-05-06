"use client";


import { useState } from "react";


export default function ContactPage() {
  const sendContact = async (data: any) => {
  // Placeholder: simulate sending
  return new Promise((resolve) => setTimeout(resolve, 500));
};
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await sendContact(form);
    setStatus("Message sent!");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="p-8">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input required placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="border p-2 rounded" />
        <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="border p-2 rounded" />
        <textarea required placeholder="Message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="border p-2 rounded" />
        <button type="submit" className="bg-purple-600 text-white p-2 rounded">Send</button>
      </form>
      {status && <p className="mt-4 text-green-600">{status}</p>}
    </div>
  );
}

