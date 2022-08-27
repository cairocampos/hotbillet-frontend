import { AxiosError } from "axios";
import Swal, { SweetAlertResult } from "sweetalert2";

interface IAlert {
  success: (message: string) => void;
  error: (message: string | AxiosError) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
  showLoading: (title?: string) => Promise<SweetAlertResult>;
  hideLoading: () => void;
  confirm: (text: string) => Promise<SweetAlertResult>;
}

interface Composition {
  alerts: IAlert;
}

export default function useAlert(): Composition {
  function createNotify(
    title: string,
    text: string,
    type: "info" | "success" | "error" | "warning"
  ) {
    Swal.fire({
      title,
      html: text,
      icon: type,
    });
  }

  const showErrorsMessage = (error: AxiosError) => {
    const messageError =
      error.response?.data?.errors ?? error.response?.data?.message;
    if (messageError instanceof Object) {
      const messages = Object.values<string[]>(messageError).map(
        (message, index) => {
          return message[0];
        }
      );

      createNotify("Atenção", messages.join("<br/>"), "error");
    } else {
      createNotify("Atenção", messageError, "error");
    }
  };

  const alerts = {
    success(message: string) {
      return createNotify("Sucesso", message, "success");
    },

    error(message: string | AxiosError) {
      if (typeof message != "string" && message?.isAxiosError) {
        return showErrorsMessage(message);
      }
      return createNotify("Error", message as string, "error");
    },

    info(message: string) {
      return createNotify("Atenção", message, "info");
    },

    warning(message: string) {
      return createNotify("Atenção", message, "warning");
    },
    showLoading(title = "Carregando...") {
      return Swal.fire({
        title,
        allowOutsideClick:false,
        didOpen() {
          Swal.showLoading();
        },
      });
    },
    hideLoading() {
      Swal.close();
    },
    confirm(text: string) {
      return Swal.fire({
        title: "Você confirma essa operação?",
        text,
        icon: "question",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        showCancelButton: true,
        cancelButtonColor: "red",
      });
    },
  };

  return {
    alerts,
  };
}