import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/redux/reduxProvider";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <NextUIProvider>
            {children}
            <Toaster
              position="top-right"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 2500,
                },
                error: {
                  duration: 4000,
                },
                style: {
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                },
              }}
            />
          </NextUIProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
