export const CATEGORIES = [
  { id: "all", label: "All Icons" },
  { id: "arrows", label: "Arrows", keywords: ["arrow", "chevron", "move", "direction"] },
  { id: "interface", label: "Interface", keywords: ["menu", "home", "search", "settings", "user", "bell", "check", "x", "plus", "minus", "more", "eye", "star", "heart"] },
  { id: "files", label: "Files & Folders", keywords: ["file", "folder", "archive", "document", "copy", "clipboard"] },
  { id: "media", label: "Media", keywords: ["play", "stop", "pause", "audio", "video", "image", "music", "camera", "volume"] },
  { id: "communication", label: "Communication", keywords: ["mail", "message", "phone", "send", "chat", "inbox"] },
  { id: "editor", label: "Editor", keywords: ["edit", "pen", "pencil", "text", "bold", "italic", "align", "type", "font", "list"] },
  { id: "devices", label: "Devices", keywords: ["laptop", "monitor", "smartphone", "tablet", "watch", "mouse", "keyboard", "printer"] },
  { id: "commerce", label: "Commerce", keywords: ["shopping", "cart", "bag", "credit", "card", "wallet", "tag", "price", "store", "shop", "dollar", "euro", "bitcoin"] },
  { id: "weather", label: "Weather", keywords: ["sun", "moon", "cloud", "rain", "snow", "wind", "storm", "lightning", "temperature"] },
];

export function getIconCategory(iconName: string): string[] {
  const nameLower = iconName.toLowerCase();
  const matchedCategories = [];

  for (const cat of CATEGORIES) {
    if (cat.id === "all") continue;
    if (cat.keywords?.some(kw => nameLower.includes(kw))) {
      matchedCategories.push(cat.id);
    }
  }

  return matchedCategories.length > 0 ? matchedCategories : ["misc"];
}
