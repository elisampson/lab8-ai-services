import { BaseAIService } from "./AIService.js";

export class MockService extends BaseAIService {
  async complete() {
    return "This is a mock AI reply ";
  }
}
