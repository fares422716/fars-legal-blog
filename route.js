import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
  const { title, content } = await req.json();

  if (!title || !content) {
    return Response.json({ error: "العنوان والمحتوى مطلوبان" }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "data");
  const file = path.join(dir, "posts.json");

  try {
    await mkdir(dir, { recursive: true });

    let posts = [];
    try {
      const existing = await import(`@/data/posts.json`);
      posts = existing.default || [];
    } catch {}

    posts.unshift({ title, content, created: new Date().toISOString() });

    await writeFile(file, JSON.stringify(posts, null, 2), "utf-8");

    return Response.json({ message: "تم الحفظ" });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
