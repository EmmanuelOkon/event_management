import { toast } from "sonner";

type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";


interface ToastOptions {
  position?: Position;
  autoClose?: number;
  pauseOnHover: boolean;
}

export const notifySuccess = (message: string, options?: ToastOptions) => {
  toast.success(message, options);
};

export const notifyError = (message: string, options?: ToastOptions) => {
  toast.error(message, options);
};
