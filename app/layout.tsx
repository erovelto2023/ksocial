import type { Metadata } from 'next'
import './globals.css'
import ClientProviders from "./ClientProviders";
import SessionProviders from "./SessionProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProviders>
          <ClientProviders>
            {children}
          </ClientProviders>
        </SessionProviders>
      </body>
    </html>
  );
}
