import "../assets/styles/globals.css";
import { ToastProvider } from "@/components/shadcn/use-toast";
import Header from "@/components/ui/nav";
import { ThemeProvider } from "@/utils/theme/ThemeProvider";
import { metadata as siteMetadata } from "@/utils/data/metaData";

export const metadata = siteMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="font-pretendard">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
