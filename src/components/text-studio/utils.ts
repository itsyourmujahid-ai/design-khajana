// Local rule-based processing logic for Text Studio

export function getRecommendedHeading(text: string): string {
  if (!text) return "Paste your text to get a heading";
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= 6) return text;

  // Extract first logical sentence or first 6-8 words for a heading
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const firstSentence = sentences[0].trim();

  if (firstSentence.split(/\s+/).length <= 10) {
    return firstSentence.replace(/[.!?]+$/, ''); // Remove trailing punctuation for heading
  }

  return words.slice(0, 6).join(" ") + "...";
}

export function getRecommendedSubheading(text: string): string {
  if (!text) return "A supportive subheading will appear here";

  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  if (sentences.length > 1) {
    return sentences[1].trim();
  }

  const words = text.split(/\s+/).filter(Boolean);
  if (words.length > 10) {
    return words.slice(6, 18).join(" ") + "...";
  }

  return "Add more context for a proper subheading.";
}

export function getRecommendedCTA(text: string): string {
  if (!text) return "Get Started";

  const lowerText = text.toLowerCase();

  // Basic intent matching
  if (lowerText.includes("buy") || lowerText.includes("purchase") || lowerText.includes("shop")) {
    return "Shop Now";
  }
  if (lowerText.includes("learn") || lowerText.includes("discover") || lowerText.includes("read")) {
    return "Learn More";
  }
  if (lowerText.includes("subscribe") || lowerText.includes("newsletter") || lowerText.includes("join")) {
    return "Subscribe";
  }
  if (lowerText.includes("contact") || lowerText.includes("talk") || lowerText.includes("help")) {
    return "Contact Us";
  }
  if (lowerText.includes("download") || lowerText.includes("app") || lowerText.includes("get")) {
    return "Download App";
  }

  return "Get Started";
}

export function rewriteProfessional(text: string): string {
  if (!text) return "";
  const result = text
    .replace(/\b(cool|awesome|great|amazing)\b/gi, "excellent")
    .replace(/\b(stuff|things)\b/gi, "items")
    .replace(/\b(bad)\b/gi, "suboptimal")
    .replace(/\b(fix)\b/gi, "resolve")
    .replace(/\b(help)\b/gi, "assist")
    .replace(/\b(buy)\b/gi, "purchase")
    .replace(/\b(need)\b/gi, "require");

  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function rewritePremium(text: string): string {
  if (!text) return "";
  const result = text
    .replace(/\b(buy)\b/gi, "acquire")
    .replace(/\b(best)\b/gi, "finest")
    .replace(/\b(new)\b/gi, "exclusive")
    .replace(/\b(good)\b/gi, "exceptional")
    .replace(/\b(cheap)\b/gi, "accessible")
    .replace(/\b(fast)\b/gi, "expedited")
    .replace(/\b(product)\b/gi, "collection")
    .replace(/\b(use)\b/gi, "experience");

  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function rewriteCorporate(text: string): string {
  if (!text) return "";
  const result = text
    .replace(/\b(do)\b/gi, "execute")
    .replace(/\b(plan)\b/gi, "strategy")
    .replace(/\b(team)\b/gi, "workforce")
    .replace(/\b(goal)\b/gi, "objective")
    .replace(/\b(money)\b/gi, "revenue")
    .replace(/\b(use)\b/gi, "leverage")
    .replace(/\b(talk)\b/gi, "sync")
    .replace(/\b(later)\b/gi, "moving forward");

  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function rewriteCatchy(text: string): string {
  if (!text) return "";
  let result = text
    .replace(/\b(best)\b/gi, "mind-blowing")
    .replace(/\b(good)\b/gi, "epic")
    .replace(/\b(fast)\b/gi, "lightning-fast")
    .replace(/\b(new)\b/gi, "game-changing")
    .replace(/\b(easy)\b/gi, "effortless")
    .replace(/\b(try)\b/gi, "dive into")
    .replace(/\b(buy)\b/gi, "grab yours");

  // Add a catchy exclamation if it ends in a period
  if (result.endsWith(".")) {
    result = result.slice(0, -1) + "!";
  }

  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function shortenText(text: string): string {
  if (!text) return "";
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

  if (sentences.length <= 1) {
    // If it's just one sentence, remove filler words
    const fillerWords = ["very", "really", "basically", "actually", "literally", "just", "quite", "somewhat"];
    let shortened = text;
    fillerWords.forEach(word => {
      shortened = shortened.replace(new RegExp(`\\b${word}\\s+`, 'gi'), "");
    });
    return shortened;
  }

  // Return the first and last sentence if long
  if (sentences.length > 2) {
    return `${sentences[0].trim()} ${sentences[sentences.length - 1].trim()}`;
  }

  return sentences[0].trim();
}

export function analyzeTextLength(text: string) {
  const charCount = text.length;
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // avg 200 words per min

  return { charCount, wordCount, readingTime };
}
