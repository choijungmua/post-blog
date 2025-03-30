import "../assets/styles/globals.css";
import { ToastProvider } from "@/components/shadcn/use-toast";
import Header from "@/components/shadcn/header";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata = {
  title: "블로그",
  description: "Next.js로 만든 블로그",
};

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
