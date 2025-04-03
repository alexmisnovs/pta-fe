import ApolloWrapper from "@/components/utility/ApolloWrapper";
import apolloClient from "@/lib/apollo-client";
import { HeaderDocument, FooterDocument, GlobalDocument } from "@/gql/graphql";
import Navigation from "@/components/Navigation";
import Footer from "@/components/shared/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "SaintModwens Catholic School PTA",
//   description: "SaintModwens Catholic School PTA",
// };

// my version
export async function generateMetadata() {
  const { data: globalData = {}, error: globalError } = await apolloClient.query({
    query: GlobalDocument,
  });

  if (globalError) return { title: "SaintModwens Catholic School PTA" };

  return {
    title: {
      template: `%s | ${globalData.global?.siteName}`,
      default: globalData.global?.siteName,
    },
    description: globalData.global?.siteDescription,
    openGraph: {
      images: [globalData.global?.defaultSeo?.shareImage?.url],
      type: "website",
      siteName: globalData.global?.siteName,
      title: globalData.global?.siteName,
      description: globalData.global?.siteDescription,
    },
    // Add this section for color-scheme
    other: {
      "color-scheme": "light dark",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: globalData = {}, error: globalError } = await apolloClient.query({
    query: GlobalDocument,
  });
  const { data = {}, error } = await apolloClient.query({
    query: HeaderDocument,
    context: {
      // initialApolloState,
      fetchOptions: {
        next: { revalidate: 10 },
      },
    },
  });
  const { data: footerData = {}, error: footerError } = await apolloClient.query({
    query: FooterDocument,
    context: {
      // initialApolloState,
      fetchOptions: {
        next: { revalidate: 10 },
      },
    },
  });

  // console.log("Data from strapi");
  // console.log(footerData);
  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (footerError) return <p>Error: {footerError.message}</p>;
  if (globalError) return <p>Error: {globalError.message}</p>;
  return (
    <html lang="en">
      <ApolloWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-200 min-h-[100dvh] grid grid-rows-[auto_1fr_auto] w-screen`}
        >
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />
          <Navigation data={data} />
          {/* <main className="backdrop-blur z-10 max-w-6xl mx-auto bg-white/50 rounded-xl py-7 px-8 m-6 overflow-hidden"> */}
          <main className="backdrop-blur z-10 overflow-hidden bg-base  mb-10">{children}</main>
          <Footer data={footerData} siteName={globalData.global?.siteName} />
        </body>
      </ApolloWrapper>
    </html>
  );
}
