
export interface UpdateFn<T, R = T> {
  (value: T, ...args: any[]): R,
}

export type Key = string | number

// target = Record, path = scalar
export function get<T = any>(obj: Record<string, T>, path: Key): T
export function assoc<T = any, R = T>(obj: Record<string, T>, path: Key, value: R): Record<string, T | R>
export function dissoc<T = any>(obj: Record<string, T>, path: Key): Record<string, T>
export function update<T = any, V = T>(obj: Record<string, T>, path: Key, updateFn: UpdateFn<T, V>): Record<string, T | V>
export function merge<T = any, V = T>(obj: Record<string, T>, ...objs: Array<Record<string, V>>): Record<string, T | V>
export function deepMerge<T = any, V = T>(obj: Record<string, T>, ...objs: Array<Record<string, V>>): Record<string, T | V>

// target = Record, path = vector
export function get<T = any, R = T>(obj: Record<string, T>, path: Key[]): R
export function assoc<T = any, V = T, R = T | V>(obj: Record<string, T>, path: Key[], value: V): Record<string, R>
export function dissoc<T = any, R = T>(obj: Record<string, T>, path: Key[]): Record<string, R>
export function update<T = any, V = T, R = T | V>(obj: Record<string, T>, path: Key[], updateFn: UpdateFn<T, V>): Record<string, R>

// target = Array, path = scalar
export function get<T = any>(arr: T[], path: number): T
export function assoc<T = any, V = T>(arr: T[], path: number, value: V): Array<T | V>
export function dissoc<T = any>(arr: T[], path: number): Array<T | void>
export function update<T = any, V = T>(arr: T[], path: number, updateFn: UpdateFn<T, V>): Array<T | V>

// target = Array, path = vector
export function get<T = any, R = T>(arr: T[], path: Key[]): R
export function assoc<T = any, V = T, R = T>(arr: T[], path: Key[], value: V): R[]
export function dissoc<T = any, R = T>(arr: T[], path: Key[]): R[]
export function update<T = any, V = T, R = T>(arr: T[], path: Key[], updateFn: UpdateFn<T, V>): R[]
