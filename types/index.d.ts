
export interface UpdateFn<T, R = T> {
  (value: T, ...args: any[]): R,
}

export type Key = string | number

// unfortunately, TS doesn't support recursive types
// see https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128843289 
// type PropType<T extends object, K> = 
//   K extends [keyof T, infer R] ? (T[K[0]] extends object ? PropType<T[K[0]], R> : never)
//   : K extends keyof T ? T[K] : never

// merge functions
export function merge<T = any, V = T>(obj: Record<string, T>, ...objs: Array<Record<string, V>>): Record<string, T | V>
export function deepMerge<T = any, V = T>(obj: Record<string, T>, ...objs: Array<Record<string, V>>): Record<string, T | V>

// target = object like, path = vector
export function get<T extends object, R = unknown>(obj: T, path: Key[]): R
export function assoc<T extends object, V = unknown>(obj: T, path: Key[], value: V): T
export function dissoc<T extends object>(obj: T, path: Key[]): T
export function update<T extends object, V = unknown, R = V>(obj: T, path: Key[], updateFn: UpdateFn<V, R>): T

// target = array, path = scalar
export function dissoc<T = any>(arr: T[], path: number): Array<T | void>

// target = object like, path = scalar
export function get<T extends object, K extends keyof T>(obj: T, path: K): T[K]
export function assoc<T extends object, K extends keyof T>(obj: T, path: K, value: T[K]): T
export function dissoc<T extends object, K extends keyof T>(obj: T, path: K): Omit<T, K>
export function update<T extends object, K extends keyof T, V = T[K]>(obj: T, path: K, updateFn: UpdateFn<T[K], V>): T


