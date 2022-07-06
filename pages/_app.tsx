import "../styles/index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Component {...pageProps} />;
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </UserProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
