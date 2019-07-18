
export interface UpdateFn<T, R = T, A extends Array<any> = any[]> {
  (value: T, ...args: A): R,
}

export type Key = string | number

// unfortunately, TS doesn't support recursive types
// see https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128843289 
// type PropType<T extends object, K> = 
//   K extends [keyof T, infer R] ? (T[K[0]] extends object ? PropType<T[K[0]], R> : never)
//   : K extends keyof T ? T[K] : never

// merge functions
export function merge<T extends object>(obj: T, ...objs: Array<object>): T
export function deepMerge<T extends object>(obj: T, ...objs: Array<object>): T

// target = object like, path = vector
export function get<T extends object, R = unknown>(obj: T, path: Key[], def?: R): R
export function assoc<T extends object, V = unknown>(obj: T, path: Key[], value: V): T
export function dissoc<T extends object>(obj: T, path: Key[]): T
export function update<T extends object, V = unknown, R = V>
                  (obj: T, path: Key[], updateFn: UpdateFn<V, R, typeof args>, ...args: any[]): T

// target = array, path = scalar
export function dissoc<T = any>(arr: T[], path: number): Array<T | void>

// target = object like, path = scalar
export function get<T extends object, K extends keyof T>(obj: T, path: K, def?: T[K]): T[K]
export function assoc<T extends object, K extends keyof T>(obj: T, path: K, value: T[K]): T
export function dissoc<T extends object, K extends keyof T>(obj: T, ...paths: K[]): Omit<T, K>
export function update<T extends object, K extends keyof T, V = T[K]>
                  (obj: T, path: K, updateFn: UpdateFn<T[K], V, typeof args>, ...args: any[]): T

// variadic forms
export function assoc<T extends object>(obj: T,
   path: Key[] | Key, value: any,
   path2: Key[] | Key, value2: any
): T
export function assoc<T extends object>(obj: T,
  path: Key[] | Key, value: any,
  path2: Key[] | Key, value2: any,
  path3: Key[] | Key, value3: any,
): T
export function assoc<T extends object>(obj: T,
  path: Key[] | Key, value: any,
  path2: Key[] | Key, value2: any,
  path3: Key[] | Key, value3: any,
  ...args: Array<any>
): T

