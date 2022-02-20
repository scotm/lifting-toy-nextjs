import "../styles/index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />;
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;
