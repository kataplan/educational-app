import { Box } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FC, PropsWithChildren } from "react";

import Toolbar from "@/components/ui/toolbar/Toolbar";
import { CoursesProvider } from "@/providers/CoursesProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Educational App",
  description: "A platform for managing educational content",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <CoursesProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight:"calc(100vh - 64px)"  }}>
              <Toolbar />
              <Box component="main" sx={{ flexGrow: 1, mt: '64px' }}>
                {children}
              </Box>
            </Box>
          </CoursesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};
export default RootLayout