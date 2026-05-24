import type { TicketTemplate } from "@/types";

export const ticketTemplates: TicketTemplate[] = [
  {
    id: "classic",
    name: "经典电影票",
    styleKey: "classic",
    previewUrl: "",
    backgroundStyle: "linear-gradient(135deg, #ead4ad, #d2aa72)",
    accentColor: "#b98431"
  },
  {
    id: "black-gold",
    name: "黑金纪念版",
    styleKey: "black-gold",
    previewUrl: "",
    backgroundStyle: "linear-gradient(135deg, #101010, #2d2418)",
    accentColor: "#d7a34d"
  },
  {
    id: "vintage",
    name: "复古纸质票",
    styleKey: "vintage",
    previewUrl: "",
    backgroundStyle: "linear-gradient(135deg, #c89a74, #e2bd95)",
    accentColor: "#8b5536"
  }
];
