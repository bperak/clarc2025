import '@testing-library/jest-dom';

// Mock lucide-react icons as simple stubs to avoid ESM module issues in Jest
jest.mock('lucide-react', () => new Proxy({}, {
  get: () => () => null,
})); 