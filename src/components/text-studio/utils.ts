// Local rule-based processing logic for Text Studio

export function getRecommendedHeading(text: string): string {
  if (!text) return "Paste your text to get a heading";
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= 6) return text;

  // Create a genuine rewriting logic instead of just copying
  // A heading should be concise and strong.

  const lowerText = text.toLowerCase();
  let prefix = "";
  if (lowerText.includes("premium") || lowerText.includes("high quality")) prefix = "Premium ";
  else if (lowerText.includes("new") || lowerText.includes("introducing")) prefix = "Introducing ";
  else if (lowerText.includes("fast") || lowerText.includes("quick")) prefix = "Fast ";

  // Try to find the subject
  let subject = "Solutions";
  if (lowerText.includes("glass")) subject = "Glass " + subject;
  if (lowerText.includes("design")) subject = "Design " + subject;
  if (lowerText.includes("software") || lowerText.includes("app")) subject = "Digital " + subject;

  // Find target audience / context
  let suffix = "";
  if (lowerText.includes("modern") || lowerText.includes("architecture")) suffix = " for Modern Architecture";
  else if (lowerText.includes("business") || lowerText.includes("corporate")) suffix = " for Your Business";
  else if (lowerText.includes("home") || lowerText.includes("personal")) suffix = " for Your Home";

  const generatedHeading = `${prefix}${subject}${suffix}`.trim();

  // If we couldn't generate something very different, at least Title Case a summary
  if (generatedHeading === "Solutions") {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const firstSentence = sentences[0].trim().replace(/[.!?]+$/, '');
    const firstWords = firstSentence.split(/\s+/).slice(0, 5).join(" ");
    return firstWords.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  return generatedHeading;
}

export function getRecommendedSubheading(text: string): string {
  if (!text) return "A supportive subheading will appear here";

  // Subheading should expand and support the main idea
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];

  let subText = text;
  if (sentences.length > 1) {
    subText = sentences.slice(1).join(" ").trim();
  }

  const words = subText.split(/\s+/).filter(Boolean);
  if (words.length < 5) {
     return "Discover how we can transform your workflow with our advanced services.";
  }

  // Make it sound like a subheading
  let result = words.slice(0, 15).join(" ");
  result = result.replace(/\b(We provide|Our company offers)\b/gi, "Experience");
  result = result.replace(/\b(This is a)\b/gi, "Discover a");

  if (!result.endsWith(".")) result += ".";

  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function getRecommendedBody(text: string): string {
  if (!text) return "Your full body copy will appear here, properly formatted.";

  // Expand body copy genuinely
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

  let expanded = text;

  if (sentences.length <= 2) {
     // Expand it by adding transitional phrases
     expanded = `${sentences[0].trim()} This fundamentally changes how you approach the problem. ${sentences[1] ? sentences[1].trim() : "By focusing on what truly matters, we deliver exceptional results."} It’s not just about getting it done; it’s about setting a new standard for excellence.`;
  }

  return expanded;
}

export function getRecommendedCTA(text: string): string {
  if (!text) return "Get Started";

  const lowerText = text.toLowerCase();

  if (lowerText.includes("buy") || lowerText.includes("purchase") || lowerText.includes("shop")) return "Shop Now";
  if (lowerText.includes("learn") || lowerText.includes("discover") || lowerText.includes("read")) return "Learn More";
  if (lowerText.includes("subscribe") || lowerText.includes("newsletter") || lowerText.includes("join")) return "Subscribe";
  if (lowerText.includes("contact") || lowerText.includes("talk") || lowerText.includes("help")) return "Contact Us";
  if (lowerText.includes("download") || lowerText.includes("app") || lowerText.includes("get")) return "Download App";
  if (lowerText.includes("free") || lowerText.includes("trial")) return "Start Free Trial";

  return "Get Started";
}

export function rewriteProfessional(text: string): string {
  if (!text) return "";
  const result = text
    .replace(/\b(cool|awesome|great|amazing)\b/gi, "excellent")
    .replace(/\b(stuff|things)\b/gi, "resources")
    .replace(/\b(bad)\b/gi, "suboptimal")
    .replace(/\b(fix)\b/gi, "resolve")
    .replace(/\b(help)\b/gi, "assist")
    .replace(/\b(buy)\b/gi, "purchase")
    .replace(/\b(need)\b/gi, "require")
    .replace(/\b(want)\b/gi, "desire")
    .replace(/\b(make)\b/gi, "develop");

  return result === text ? "Our team ensures the highest standard of delivery. " + result : result.charAt(0).toUpperCase() + result.slice(1);
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
    .replace(/\b(use)\b/gi, "experience")
    .replace(/\b(make)\b/gi, "craft");

  return result === text ? "Discover the unparalleled elegance of our offering. " + result : result.charAt(0).toUpperCase() + result.slice(1);
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
    .replace(/\b(later)\b/gi, "moving forward")
    .replace(/\b(help)\b/gi, "facilitate");

  return result === text ? "We are committed to driving strategic growth. " + result : result.charAt(0).toUpperCase() + result.slice(1);
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
    .replace(/\b(buy)\b/gi, "grab yours")
    .replace(/\b(very)\b/gi, "insanely");

  if (result.endsWith(".")) {
    result = result.slice(0, -1) + "!";
  }

  return result === text ? "Ready for something amazing? " + result + "!" : result.charAt(0).toUpperCase() + result.slice(1);
}

export function shortenText(text: string): string {
  if (!text) return "";
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

  if (sentences.length <= 1) {
    const fillerWords = ["very", "really", "basically", "actually", "literally", "just", "quite", "somewhat", "in fact", "to be honest"];
    let shortened = text;
    fillerWords.forEach(word => {
      shortened = shortened.replace(new RegExp(`\\b${word}\\s+`, 'gi'), "");
    });
    return shortened;
  }

  if (sentences.length > 2) {
    return `${sentences[0].trim()} ${sentences[sentences.length - 1].trim()}`;
  }

  return sentences[0].trim();
}

export function analyzeTextLength(text: string) {
  const charCount = text.length;
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return { charCount, wordCount, readingTime };
}
