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
  try {
    // Verifica se a página está dentro de um iframe
    const isIframe = window.self !== window.top;

    // Obtém a URL da página principal ou da própria página
    const currentUrl = (() => {
      try {
        if (isIframe && window.top?.location) {
          console.log("Using iframe");
          return new URL(window.top.location.href); // URL da página principal
        }
      } catch {
        console.warn(
          "Unable to access window.top.location. Using window.location as fallback."
        );
      }
      console.log("Using page");
      return new URL(window.location.href); // URL da página atual
    })();

    // Extrai os parâmetros UTM
    const utmParams = {
      utm_source: currentUrl.searchParams.get("utm_source") || "",
      utm_medium: currentUrl.searchParams.get("utm_medium") || "",
      utm_campaign: currentUrl.searchParams.get("utm_campaign") || "",
      utm_term: currentUrl.searchParams.get("utm_term") || "",
      utm_content: currentUrl.searchParams.get("utm_content") || "",
    };
    console.log(utmParams);

    return utmParams;
  } catch (error) {
    console.error("Error fetching UTM parameters:", error);
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
    };
  }
}

export async function validateWhatsapp(
  number: number | string
): Promise<boolean> {
  const formatedPhone = number
    .toString()
    .replaceAll(" ", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("-", "");

  try {
    const response = await fetch(
      `https://api.z-api.io/instances/3D7852425F8E40FF893D3E72838DD104/token/FCDA52D325CCCDC22CD583EB/phone-exists/55${formatedPhone}`,
      {
        headers: {
          "Client-Token": "F9aa89bc6dedc4b998458decc01365a7aS",
        },
      }
    );

    const data = await response.json();
    return data.exists; // Explicitly return the boolean value
  } catch (error) {
    console.error("Error validating WhatsApp number:", error);
    return false; // Handle errors gracefully and return a default value
  }
}

export async function getUserIP() {
  try {
    // Usando o serviço de API pública ipify para obter o IP
    const response = await fetch("https://api.ipify.org?format=json");
    if (!response.ok) {
      throw new Error("Erro ao obter o IP");
    }
    const data = await response.json();
    return data.ip; // Retorna o IP
  } catch (error) {
    console.error("Erro ao obter o IP", error);
    return null; // Retorna null em caso de erro
  }
}

export function deepEqual(obj1: any, obj2: any) {
  if (obj1 === obj2) return true; // Mesma referência
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false; // Não são objetos ou são null
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false; // Número de propriedades diferente

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false; // Propriedade não existe ou valores não são iguais
    }
  }

  return true;
}
