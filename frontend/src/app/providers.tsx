'use client';
import { ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// Create a client
const queryClient = new QueryClient()
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(0, 123, 255, 100%)',
      contrastText: 'rgb(245,244,255)'
    },
    text: {
      primary: 'rgba(18, 18, 18, 1)',
      secondary: 'rgba(67, 84, 107, 1)',
      disabled: 'rgba(129, 151, 184, 1)',
    },
    mode: 'light',
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
  )
}