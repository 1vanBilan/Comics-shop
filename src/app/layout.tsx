"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query"


const queryClient = new QueryClient()

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
