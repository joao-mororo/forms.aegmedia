export function useUTMParams() {
  // if (typeof window !== "undefined") {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     utm_source: urlParams.get("utm_source") || "",
  //     utm_medium: urlParams.get("utm_medium") || "",
  //     utm_campaign: urlParams.get("utm_campaign") || "",
  //     utm_term: urlParams.get("utm_term") || "",
  //     utm_content: urlParams.get("utm_content") || "",
  //   }));
  // }
  if (typeof window !== "undefined") {
    const searchParams = window.top
      ? new URLSearchParams(window.top.location.search)
      : new URLSearchParams(window.location.search);
    const params: Record<string, string> = {};
    for (const [key, value] of searchParams) {
      params[key] = value;
    }
    return params;
  }
}
