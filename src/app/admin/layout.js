export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-charcoal text-white p-6">
        <h2 className="text-2xl font-bold mb-8 text-primary tracking-widest uppercase">FOINSTER CMS</h2>
        <nav className="space-y-4">
          <a href="/admin/pages" className="block py-2 px-4 rounded hover:bg-white/10 transition-colors">Pages</a>
          <a href="/admin/projects" className="block py-2 px-4 rounded hover:bg-white/10 transition-colors">Projects</a>
          <a href="/admin/blogs" className="block py-2 px-4 rounded hover:bg-white/10 transition-colors">Blogs</a>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
