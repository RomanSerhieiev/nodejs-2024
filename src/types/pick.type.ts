export type TPickRequired<T, K extends keyof T> = {
  [P in K]-?: T[P];
};
