import '@testing-library/jest-dom';

global.matchMedia = global.matchMedia || function mockMatchMedia() {
  return {
    matches: false,
    addListener() { },
    removeListener() { },
  };
};