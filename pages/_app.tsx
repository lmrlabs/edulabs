import type { AppProps } from "next/app";
import { trpc } from "@/utils/trpc";
import "../styles/globals.css";
// import { cn } from "@/lib/utils";
// import { Inter as FontSans } from "next/font/google";

// export const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

function App({ Component, pageProps }: AppProps) {
  return (
    <div
    // className={cn(
    //   "min-h-screen bg-background font-sans antialiased",
    //   fontSans.variable
    // )}
    >
      <Component {...pageProps} />
    </div>
  );
}

export default trpc.withTRPC(App);
