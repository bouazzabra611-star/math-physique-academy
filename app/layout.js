import "./globals.css";

export const metadata = {
  title: "Math & Physique Academy | أكاديمية الرياضيات والفيزياء",
  description:
    "Plateforme éducative dédiée aux élèves marocains — Cours, exercices corrigés et examens du collège au baccalauréat. منصة تعليمية للتلاميذ المغاربة.",
  keywords: "math, physique, bac maroc, exercices, cours, باكالوريا, رياضيات, فيزياء",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* خط Inter من Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
