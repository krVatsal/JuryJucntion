import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Line from "./components/Line";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JuryJunction",
  description: "An app to connect Advocates with their clients",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <div className="min-h-[89vh] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">

        {children}
        </div>
        <Line/>
        <Footer/>
        </body>
    </html>
  );
}
