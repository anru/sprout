import { expectType, expectError } from 'tsd'
import { get, assoc, dissoc, update, merge, deepMerge } from '.'

interface Nested {
  step: number,
}

interface ComplexStruct {
  name: string,
  nested: Nested,
}


const s: ComplexStruct[] = [
  {
    name: 'foo',
    nested: {
      step: 1,
    },
  },
]

const r: Record<string, number> = {
  'one': 1,
  'two': 2,
}

expectType<number>(get(r, 'one', 4))
expectType<string>(get(s, [0, 'sfg', 'd'], 'dsfg'))
expectType<unknown>(get(s, [0, 'sfg', 'd']))

assoc(r, 'one', 2)
expectError(assoc(r, 'one', 'dfg'))

assoc(s[0],
  'name', 'bar',
  ['nested', 'step'], 2
)

assoc(s[0],
  'name', 'bar',
  ['nested', 'step'], 2,
  ['nested', 'step'], 3
)

assoc(s[0],
  'name', 'bar',
  ['nested', 'step'], 2,
  ['nested', 'step'], 3,
  ['nested', 'step'], 4
)

assoc(s[0], 'name', 'new value') as ComplexStruct

// for now type checking for vector paths are not supported
assoc(s, ['nested', 'step'], false)


expectType<string>(get(s[0], 'name'))
expectError(assoc(s, 0, 'string'))

function eatComplexStruct(s: ComplexStruct): ComplexStruct {
  return s
}

eatComplexStruct(merge(s[0], s[0]))
eatComplexStruct(deepMerge(s[0], s[0]))

eatComplexStruct(assoc(s[0], ['nested', 'step'], 5))

dissoc(s[0], 'name', 'nested')
dissoc(s, 0, 1, 2, 3)
dissoc(s, ['0', '1', '2'], 3)

expectError(eatComplexStruct(dissoc(s[0], 'name')))

expectError(eatComplexStruct(dissoc(s, 0)[0]))

update(s, [0, 'name'], (name: string, foo: string) => name + 'dfg', 1, 2, 3)[0]

update(s[0], 'name', (name: string) => name + 'hello')
expectError(update(s[0], 'name', (name: number) => name + 3))