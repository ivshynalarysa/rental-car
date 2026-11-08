import type { Metadata } from "next";
import TanStackProvider from "../providers/TanStackProvider";
import "./globals.css";
import Header from "../components/layout/Header/Header";



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
        </TanStackProvider>
        
      </body>
    </html>
  );
}
