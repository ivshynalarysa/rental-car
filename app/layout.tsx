import type { Metadata } from "next";
import TanStackProvider from "../providers/TanStackProvider";
import "./globals.css";
import Header from "../components/layout/Header/Header";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "RentalCar",
  description: "Find and rent your perfect car",
};

export default function RootLayout({
  children }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en" >
      <body>
        <TanStackProvider>
            <Header />
          {children}
          <Toaster position="top-right" />
        </TanStackProvider>
        
      </body>
    </html>
  );
}
