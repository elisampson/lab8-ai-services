// Base class for all AI services
export class BaseAIService {
  async complete(_history) {
    throw new Error("complete() not implemented");
  }
}
