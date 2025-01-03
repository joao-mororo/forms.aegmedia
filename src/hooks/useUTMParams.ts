import { useEffect, useState } from "react";

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export const useUTMParams = (): UTMParams => {
  const [utmParams, setUTMParams] = useState<UTMParams>({});

  useEffect(() => {
    try {
      // Verifica se está dentro de um iframe e se window.top é acessível
      const isIframe = window.self !== window.top && window.top !== null;

      // Obtém a URL apropriada (da página principal ou da própria página)
      const currentUrl = isIframe
        ? (() => {
            try {
              return new URL(window.top!.location.href); // Acessa window.top.location com segurança
            } catch {
              console.warn("Unable to access window.top.location");
              return new URL(window.location.href); // Fallback para a URL da página atual
            }
          })()
        : new URL(window.location.href);

      // Extrai os parâmetros UTM
      const params: UTMParams = {
        utm_source: currentUrl.searchParams.get("utm_source") || undefined,
        utm_medium: currentUrl.searchParams.get("utm_medium") || undefined,
        utm_campaign: currentUrl.searchParams.get("utm_campaign") || undefined,
        utm_term: currentUrl.searchParams.get("utm_term") || undefined,
        utm_content: currentUrl.searchParams.get("utm_content") || undefined,
      };

      // Atualiza o estado com os parâmetros
      setUTMParams(params);
    } catch (error) {
      console.error("Error fetching UTM params:", error);
    }
  }, []);

  return utmParams;
};
