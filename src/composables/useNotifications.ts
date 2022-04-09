import axios from "axios";
import { notify } from "notiwind";
export default function useNotifications() {
  function createNotify(
    title: string,
    text: string,
    type: "info" | "success" | "error" | "warning"
  ) {
    notify(
      {
        group: type,
        title,
        text,
        type,
      },
      5000
    ); // 4s
  }

  const notifications = {
    success(message: string) {
      return createNotify("Sucesso", message, "success");
    },

    error(error: unknown) {
      if (typeof error == "string") {
        return createNotify("Error", error, "error");
      }

      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.error) {
          const message = error?.response?.data?.error;
          if (Array.isArray(message)) {
            message.forEach((msg) => createNotify("Error", msg, "error"));
            return;
          }
          return createNotify("Error", message, "error");
        }
      }

      return createNotify("Error", "Ocorreu um erro inesperado.", "error");
    },

    info(message: string) {
      return createNotify("Atenção", message, "info");
    },

    warning(message: string) {
      return createNotify("Atenção", message, "warning");
    },
  };

  return {
    notifications,
  };
}
