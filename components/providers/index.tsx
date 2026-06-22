"use client";

import ToastProvider from "@/components/providers/toast-provider";
import { ProgressProvider, useAnchorProgress } from "@bprogress/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

function ProgressAnchorTracker() {
  useAnchorProgress({
    startPosition: 0.2,
    stopDelay: 120,
    disableSameURL: true,
  });

  return null;
}

type AppProgressBarProviderProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: AppProgressBarProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ProgressProvider
        color="oklch(0.72 0.19 28)"
        shallowRouting
        height="2px"
        options={{ showSpinner: false }}
        startPosition={0.2}
        stopDelay={120}
        disableSameURL={true}
      >
        <ProgressAnchorTracker />
        {children}
        <ToastProvider />
        <ReactQueryDevtools initialIsOpen={false} />
      </ProgressProvider>
    </QueryClientProvider>
  );
};

export default Providers;
