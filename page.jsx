'use client';
import { useState } from "react";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (!title || !content) {
      setStatus("الرجاء تعبئة العنوان والمحتوى.");
      return;
    }

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ تم نشر المقال");
        setTitle(""); setContent("");
      } else {
        setStatus("❌ " + data.error);
      }
    } catch (err) {
      setStatus("❌ فشل الاتصال بالخادم");
    }
  };

  return (
    <div dir="rtl" className="max-w-xl mx-auto mt-10 text-right space-y-4">
      <h1 className="text-2xl font-bold">نشر مقال جديد</h1>
      <input className="w-full border p-2 rounded" placeholder="عنوان المقال"
        value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="w-full border p-2 rounded h-40" placeholder="محتوى المقال"
        value={content} onChange={(e) => setContent(e.target.value)} />
      <button className="bg-black text-white px-4 py-2 rounded" onClick={handleSubmit}>
        نشر
      </button>
      {status && <p className="text-sm text-gray-600">{status}</p>}
    </div>
  );
}
