import type { Metadata } from "next";
import TanStackProvider from "../providers/TanStackProvider";
import localFont from 'next/font/local';
import "./globals.css";
import Header from "../components/layout/Header/Header";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL('https://rental-car-six-tau.vercel.app/'),
  title: "RentalCar",
  description: "Find and rent your perfect car with RentalCar",
  applicationName: 'Rental Car',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Rental Car',
    title: 'Rental Car | Find your perfect rental car',
    description: "Find and rent your perfect car with RentalCar"
  }
};

const manrope = localFont({
  src: [
    { path: '../public/fonts/Manrope-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Manrope-Medium.woff2', weight: '500' },
    { path: '../public/fonts/Manrope-SemiBold.woff2', weight: '600' },
    { path: '../public/fonts/Manrope-Bold.woff2', weight: '700' },
  ],
  variable: '--font-manrope',
  display: 'swap',
})

const inter = localFont({
  src: [{ path: "../public/fonts/Inter-Medium.woff2", weight: "500" }],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
          <Toaster position="top-right" />
        </TanStackProvider>
      </body>
    </html>
  );
}
