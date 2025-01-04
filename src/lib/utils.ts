import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function redirect(url: string) {
  if (typeof window !== "undefined") {
    if (window.top) {
      window.top.location.href = url;
    } else {
      window.location.href = url;
    }
  }
}

export function getUTMParams() {
  // try {
  //   // Verifica se a página está dentro de um iframe
  //   const isIframe = window.self !== window.top;

  //   // Obtém a URL da página principal ou da própria página
  //   const currentUrl = (() => {
  //     try {
  //       if (isIframe && window.top?.location) {
  //         console.log("Using iframe");
  //         return new URL(window.top.location.href); // URL da página principal
  //       }
  //     } catch {
  //       console.warn(
  //         "Unable to access window.top.location. Using window.location as fallback."
  //       );
  //     }
  //     console.log("Using page");
  //     return new URL(window.location.href); // URL da página atual
  //   })();

  //   // Extrai os parâmetros UTM
  //   const utmParams = {
  //     utm_source: currentUrl.searchParams.get("utm_source") || "",
  //     utm_medium: currentUrl.searchParams.get("utm_medium") || "",
  //     utm_campaign: currentUrl.searchParams.get("utm_campaign") || "",
  //     utm_term: currentUrl.searchParams.get("utm_term") || "",
  //     utm_content: currentUrl.searchParams.get("utm_content") || "",
  //   };
  //   console.log(utmParams);

  //   return utmParams;
  // } catch (error) {
  //   console.error("Error fetching UTM parameters:", error);
  //   return {
  //     utm_source: "",
  //     utm_medium: "",
  //     utm_campaign: "",
  //     utm_term: "",
  //     utm_content: "",
  //   };
  // }

  return new Promise((resolve) => {
    // Envia uma mensagem para a página principal
    window.parent.postMessage("request-utm-params", "*");

    // Ouve a resposta com os parâmetros UTM
    window.addEventListener("message", (event) => {
      if (event.data?.utmParams) {
        resolve(event.data.utmParams);
      }
    });
  });
}
