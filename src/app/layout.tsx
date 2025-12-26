import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Data Insights Hub | Interactive Data Analysis Portfolio",
  description: "A curated collection of data analysis projects featuring interactive visualizations, machine learning models, and insights from diverse datasets including Kaggle, NASA, and more.",
  keywords: ["data analysis", "visualization", "machine learning", "kaggle", "data science", "portfolio"],
  authors: [{ name: "Ericdataplus" }],
  openGraph: {
    title: "Data Insights Hub",
    description: "Interactive data analysis projects and visualizations",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📊</text></svg>" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
