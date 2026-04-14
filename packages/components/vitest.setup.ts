import { vi } from 'vitest';

Object.defineProperty(globalThis, 'ENABLE_INNER_HTML', {
  value: false,
  configurable: true,
  writable: true,
});

vi.mock('@tarojs/taro', () => {
  const taro = {
    ENV_TYPE: {
      WEB: 'WEB',
    },
    getEnv: vi.fn(() => 'WEB'),
  };

  return {
    default: taro,
  };
});
