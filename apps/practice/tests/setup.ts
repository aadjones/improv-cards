// Mock AsyncStorage
// eslint-disable-next-line no-undef
const mockAsyncStorage = {
  // eslint-disable-next-line no-undef
  getItem: jest.fn(),
  // eslint-disable-next-line no-undef
  setItem: jest.fn(),
  // eslint-disable-next-line no-undef
  removeItem: jest.fn(),
  // eslint-disable-next-line no-undef
  clear: jest.fn(),
};

// eslint-disable-next-line no-undef
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

export { mockAsyncStorage };
