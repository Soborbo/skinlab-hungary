export const languages = ["hu", "en", "de", "sk", "fr", "it", "es", "pl", "cs", "ro"] as const;
export type Lang = (typeof languages)[number];

export const domainMap: Record<Lang, string> = {
  hu: "https://skinlab.hu",
  en: "https://skinlabeurope.com",
  de: "https://skinlabeurope.com/de",
  sk: "https://skinlabeurope.com/sk",
  fr: "https://skinlabeurope.com/fr",
  it: "https://skinlabeurope.com/it",
  es: "https://skinlabeurope.com/es",
  pl: "https://skinlabeurope.com/pl",
  cs: "https://skinlabeurope.com/cs",
  ro: "https://skinlabeurope.com/ro",
};

export const routeMap: Record<string, Record<Lang, string>> = {
  home:      { hu: "", en: "", de: "", sk: "", fr: "", it: "", es: "", pl: "", cs: "", ro: "" },
  services:  { hu: "szolgaltatasok", en: "services", de: "dienstleistungen", sk: "sluzby", fr: "services", it: "servizi", es: "servicios", pl: "uslugi", cs: "sluzby", ro: "servicii" },
  contact:   { hu: "kapcsolat", en: "contact", de: "kontakt", sk: "kontakt", fr: "contact", it: "contatto", es: "contacto", pl: "kontakt", cs: "kontakt", ro: "contact" },
  training:  { hu: "kepzesek", en: "training", de: "schulungen", sk: "skolenia", fr: "formations", it: "formazione", es: "formacion", pl: "szkolenia", cs: "skoleni", ro: "formare" },
};

export function getLocalizedUrl(pageKey: string, lang: Lang): string {
  const base = domainMap[lang];
  const slug = routeMap[pageKey]?.[lang] ?? "";
  return slug ? `${base}/${slug}/` : `${base}/`;
}

export const languageNames: Record<Lang, string> = {
  hu: "Magyar", en: "English", de: "Deutsch", sk: "Slovenčina",
  fr: "Français", it: "Italiano", es: "Español", pl: "Polski",
  cs: "Čeština", ro: "Română",
};

export const pageKeys = Object.keys(routeMap);
