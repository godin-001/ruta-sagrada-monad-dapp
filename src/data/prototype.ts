import { Flame, HeartHandshake, Sparkles } from "lucide-react";

export const heroStats = [
  { label: "Meta solidaria Proactible", value: "150 MON" },
  { label: "Estaciones rituales", value: "5" },
  { label: "Coleccionables vivos", value: "150" },
];

export const pulseCards = [
  {
    title: "Registro REI",
    value: "0.25 MON",
    detail: "Activa identidad nocturna y reserva folio ritual.",
  },
  {
    title: "Donación Proactible",
    value: "68%",
    detail: "Se direcciona a prótesis y movilidad a nombre de Proactible.",
  },
  {
    title: "Pulso Monad",
    value: "10143",
    detail: "Monad Testnet lista para demo y wallet-connect.",
  },
];

export const decalogo = [
  "Caminar con propósito y visibilidad comunitaria.",
  "Transformar cada check-in en trazabilidad compartida.",
  "Firmar una promesa de cuidado para México y su diáspora.",
  "Honrar la noche como espacio de memoria, cultura y ayuda concreta.",
  "Convertir coleccionables en prueba emocional de pertenencia.",
];

export const stationFlow = [
  {
    id: "I",
    name: "Llamado del Umbral",
    status: "Completado",
    progress: 100,
    note: "Wallet enlazada y folio REI firmado.",
  },
  {
    id: "II",
    name: "Juramento del Decálogo",
    status: "En curso",
    progress: 76,
    note: "Se registró la intención solidaria hacia Proactible.",
  },
  {
    id: "III",
    name: "Pulso de la Medianoche",
    status: "Siguiente",
    progress: 42,
    note: "Check-in geosimbólico para activar memoria colectiva.",
  },
  {
    id: "IV",
    name: "Resguardo del Aficionado",
    status: "Pendiente",
    progress: 12,
    note: "Desbloquea colecta y métrica de impacto cultural.",
  },
  {
    id: "V",
    name: "Aurora del Regalo",
    status: "Pendiente",
    progress: 0,
    note: "Entrega final y distribución de coleccionables vivos.",
  },
];

export const memorialWords = [
  "memoria",
  "afición",
  "proactible",
  "prótesis",
  "mística",
  "barrio",
  "monad",
  "promesa",
  "méxico",
  "noche",
  "cuidado",
  "regalo",
  "resistencia",
  "comunidad",
  "ritual",
  "esperanza",
];

export const collectibleCategories = [
  {
    title: "Lumbre",
    total: 50,
    icon: Flame,
    description: "Energía, inicio y testimonio del primer llamado.",
    gradient: "from-amber-300/30 via-orange-300/10 to-transparent",
  },
  {
    title: "Vínculo",
    total: 50,
    icon: HeartHandshake,
    description: "Piezas de solidaridad activadas por donación a Proactible.",
    gradient: "from-emerald-300/30 via-teal-300/10 to-transparent",
  },
  {
    title: "Oráculo",
    total: 50,
    icon: Sparkles,
    description: "Memorias raras liberadas al completar las cinco estaciones.",
    gradient: "from-fuchsia-300/30 via-violet-300/10 to-transparent",
  },
];

export const reiDefaults = {
  alias: "Aficionada.001",
  intention: "Convertir la caminata en ayuda visible para prótesis vía Proactible.",
  pledge: "Firmo el decálogo y activo una ruta nocturna con impacto medible.",
};

