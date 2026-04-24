import "./globals.css";

export const metadata = {
  title: "Math & Physique Academy | أكاديمية الرياضيات والفيزياء",
  description: "Plateforme éducative dédiée aux élèves marocains",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KRLWPLB8Y3"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KRLWPLB8Y3');
        `}} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}