// declare type RefType<T> = T | null;

// declare type Recordable<T = any> = Record<string, T>;

// import type { AttributifyAttributes } from '@unocss/preset-attributify';

// declare module 'react' {
//   interface HTMLAttributes<T> extends AttributifyAttributes {}
// }

/** 从字段到函数的推导 */
// eslint-disable-next-line ts/consistent-type-definitions
type Watcher<T> = {
  // eslint-disable-next-line ts/method-signature-style
  on<K extends keyof T & string>(eventName: `${K}Changed`, callback: (oldValue: T[K], newValue: T[K]) => void): void;
};

declare function watch<T>(obj: T): Watcher<T>;

interface GObject {
  [key: string | number]: any;
}

interface Res<T = any> {
  data: T;
  status: number;
  message?: string;
  enMessage?: string;
}
