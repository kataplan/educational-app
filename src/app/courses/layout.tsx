'use client'
import { Box } from "@mui/material";
import { PropsWithChildren , FC } from "react";

import Sidebar from "@/components/ui/sidebar/Sidebar";


const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
      <Sidebar />
      <Box component="main" sx={{flexGrow: 1, ml: { sm: '65px' }}}>
        {children}
      </Box>
    </Box>
  );
}

export default RootLayout;