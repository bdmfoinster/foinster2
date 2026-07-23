const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'about', title: 'About Us' },
  { path: 'services', title: 'Our Services' },
  { path: 'projects', title: 'Projects' },
  { path: 'process', title: 'Our Process' },
  { path: 'gallery', title: 'Gallery' },
  { path: 'blog', title: 'Journal & News' },
  { path: 'testimonials-faq', title: 'Client Reviews & FAQ' },
  { path: 'contact', title: 'Contact Us' }
];

const template = (title) => `import React from 'react';

export default function Page() {
  return (
    <div style={{ paddingTop: '120px', minHeight: '60vh', paddingBottom: '80px' }} className="container">
      <h1 style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>${title}</h1>
      <p style={{ maxWidth: '800px', fontSize: '1.1rem', color: 'var(--text-light)' }}>
        This section is under construction. It will feature premium, editorial-style content that reflects the sophisticated design language of Foinster Arch.
      </p>
    </div>
  );
}
`;

pages.forEach(p => {
  const dirPath = path.join(__dirname, 'src/app', p.path);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path.join(dirPath, 'page.js'), template(p.title));
});

console.log("Pages generated.");
