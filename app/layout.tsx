import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar"
import { CalculusSidebar } from "@/components/app-siderbar";

export const metadata: Metadata = {
  title: "Tarea Karly",
  description: "21120721",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <CalculusSidebar>
              {children}
            </CalculusSidebar>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
