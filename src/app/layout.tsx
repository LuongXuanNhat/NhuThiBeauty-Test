import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { playfairDisplay } from "@/style/fonts/Playfair_Display";
import { montserrat } from "@/style/fonts/Montserrat";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${montserrat.variable}`}>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
