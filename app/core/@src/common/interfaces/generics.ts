// Optional Keys
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> &
  { [key in K]?: T[key] | undefined };
