import { ToastContainer } from "react-toastify";
import "../globals.css";
import { montserrat } from "@/style/fonts/Montserrat";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
        {children}
      </body>
    </html>
  );
}