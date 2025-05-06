"use client";



export default function AboutPage() {
  const about = { title: 'About Us', description: 'This is static placeholder content for the About page.' };
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{about.title}</h1>
      <p className="mb-6 text-lg text-muted-foreground">{about.description}</p>
    </div>
  );
}
