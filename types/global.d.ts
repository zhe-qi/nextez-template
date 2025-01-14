// Use type safe message keys with `next-intl`
type Messages = typeof import('../locales/zh.json');

// eslint-disable-next-line
declare interface IntlMessages extends Messages {}

export {};

declare global {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface ParamsType {
    [key: string]: any;
  }
}
