import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { SiteMediaProvider } from "@/components/site-media-provider";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const GOOGLE_ANALYTICS_ID = "G-V5EJZ87W9E";
const MICROSOFT_CLARITY_ID = "y2r1xpnckc";

export const metadata: Metadata = {
  title: "Reina Beauty Bamako | Micro Locks, Henné & Tresses",
  description:
    "Maison de beauté féminine à Bamako : Micro Locks, henné artistique, tresses, soins botaniques, onglerie et formations professionnelles.",
  other: { "codex-preview": "development" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
        <SiteMediaProvider><SiteShell>{children}</SiteShell></SiteMediaProvider>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${MICROSOFT_CLARITY_ID}");
          `}
        </Script>
      </body>
    </html>
  );
}
