import type { AppProps } from 'next/app';
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { montserrat } from "@/style/fonts/Montserrat";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={montserrat.className}>
      <Header />
        <Component {...pageProps} />
      <Footer />
    </div>
  );
}