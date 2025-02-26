import ApolloWrapper from "@/components/ApolloWrapper";
import apolloClient from "@/lib/apollo-client";
import { HeaderDocument } from "@/gql/graphql";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaintModwens Catholic School PTA",
  description: "SaintModwens Catholic School PTA",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data = {}, error } = await apolloClient.query({
    query: HeaderDocument,
  });

  // console.log("Data from strapi");
  // console.log(data);
  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <html lang="en">
      <ApolloWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-200 min-h-[100dvh] grid grid-rows-[auto_1fr_auto] w-screen`}
        >
          <Navigation data={data} />
          {/* <main className="backdrop-blur z-10 max-w-6xl mx-auto bg-white/50 rounded-xl py-7 px-8 m-6 overflow-hidden"> */}
          <main className="backdrop-blur z-10 overflow-hidden bg-white/50 rounded-xl py-7">
            {children}
          </main>
          <Footer url={data?.header?.logoImage?.url} />
        </body>
      </ApolloWrapper>
    </html>
  );
}
