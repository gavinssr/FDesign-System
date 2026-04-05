import Taro from '@tarojs/taro';

export function shouldUseCssVariables() {
  return Taro.getEnv() === Taro.ENV_TYPE.WEB;
}
