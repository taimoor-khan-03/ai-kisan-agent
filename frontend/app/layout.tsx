
import { Noto_Nastaliq_Urdu, Noto_Sans } from "next/font/google";
import "../styles/globals.css";

/**
 * Primary Latin font for UI copy; Noto Nastaliq for Urdu strings.
 */
const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-noto-urdu",
  weight: "400",
  subsets: ["arabic"],
  display: "swap",
});

//export const metadata: Metadata = {
//  title: "AI Crop Advisory · Multi-Agent System",
//  description:
//    "Hackathon-ready crop disease guidance with Urdu support, weather context, and medicine cost estimates.",
//  applicationName: "AI Crop Advisory",
//  icons: {
//    icon: "/icon.svg",
//  },
//};

//export const viewport: Viewport = {
//  themeColor: "#3f6b3c",
//  width: "device-width",
//  initialScale: 1,
//};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${notoUrdu.variable} font-sans`}>{children}</body>
    </html>
  );
}
