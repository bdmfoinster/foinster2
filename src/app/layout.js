import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geist = Geist({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  display: 'swap'
});

export const metadata = {
  title: "FOINSTER ARCH | Premium Architecture & Interior Design",
  description: "Designing spaces with clarity, craft, and calm. We create timeless architecture, interiors, renovations, and turnkey solutions shaped by context, function, and elegance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geist.variable} font-body antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
