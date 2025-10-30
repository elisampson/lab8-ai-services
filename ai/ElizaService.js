import  AIService  from "./AIService.js";
import { getBotResponse } from "../js/eliza.js";

export class ElizaService extends AIService {
  async getResponse(history) {
    const lastUser = [...history].reverse().find(m => m.role === "user");
    return getBotResponse(lastUser?.content || "");
  }
}
