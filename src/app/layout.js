import { Geist } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import FloatingContact from '@/components/ui/FloatingContact';
import CookieConsent from '@/components/ui/CookieConsent';
import { Providers } from '@/components/Providers';
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://astravision.com'),
  title: "Astravision - Leading AI & Blockchain Solutions",
  description: "Enterprise-grade AI, Blockchain & Cloud solutions for modern businesses",
  keywords: "AI, Blockchain, Cloud Computing, Digital Transformation, Enterprise Solutions",
  openGraph: {
    title: "Astravision - Leading AI & Blockchain Solutions",
    description: "Enterprise-grade AI, Blockchain & Cloud solutions for modern businesses",
    images: ['/og-image.jpg'],
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
};

export const viewport = {
  themeColor: '#5648D1',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <Providers>
          <ErrorBoundary>
            {children}
            <FloatingContact />
            <CookieConsent />
            <Toaster position="bottom-right" />
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
