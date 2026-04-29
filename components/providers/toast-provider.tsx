"use client";

import { Toaster } from "sonner";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      visibleToasts={3}
      toastOptions={{
        className: "text-base md:text-[12px]",
        duration: 3000,
        style: {
          borderRadius: "5px",
          outline: "none",
        },
      }}
    />
  );
};

export default ToastProvider;
