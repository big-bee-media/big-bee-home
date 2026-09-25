import "@/styles/globals.css";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${montserrat.className} ${montserrat.variable}`}>
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
}
