import "@testing-library/jest-dom/vitest";

// jsdom não implementa IntersectionObserver, usado pelo hook useReveal.
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = IntersectionObserverMock;
