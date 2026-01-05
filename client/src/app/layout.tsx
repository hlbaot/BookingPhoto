import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";

// Config Google Font
const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Booking Photo",
  icons: {
    icon: "/img/logo1.png",   
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dancing.variable}`}>
      <body
        suppressHydrationWarning={true}
      >
        {children}
        <ToastContainer position="top-right"/>
      </body>
    </html>
  );
}
