import  AIService  from "./AIService.js";

export class MockService extends AIService {
  async getResponse() {
    return "This is a mock AI reply ";
  }
}
