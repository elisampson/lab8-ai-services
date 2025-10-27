import { BaseAIService } from "./AIService.js";

export class GeminiService extends BaseAIService {
  constructor(getKey) {
    super();
    this.getKey = getKey;
  }

  async complete(history) {
    const key = this.getKey();
    if (!key) throw new Error("Missing Gemini API key");

    const lastUser = [...history].reverse().find(m => m.role === "user");
    const text = lastUser?.content || "";

    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta1/models/gemini-1.5-flash-latest:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text }] }],
        }),
      }
    );

    if (!resp.ok) {
      const msg = await resp.text();
      throw new Error("Gemini API error: " + msg);
    }

    const data = await resp.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "(No response)";
  }
}
