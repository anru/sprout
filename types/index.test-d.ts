import { expectType, expectError } from 'tsd'
import { get, assoc, dissoc, update } from '.'

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

assoc(r, 'one', 2)
expectError(assoc(r, 'one', 'dfg'))

assoc(s[0], 'name', 'new value') as ComplexStruct

// for now type checking for vector paths are not supported
assoc(s, ['nested', 'step'], false)


expectType<string>(get(s[0], 'name'))
expectError(assoc(s, 0, 'string'))

function eatComplexStruct(s: ComplexStruct): ComplexStruct {
  return s
}

eatComplexStruct(assoc(s[0], ['nested', 'step'], 5))

expectError(eatComplexStruct(dissoc(s[0], 'name')))

expectError(eatComplexStruct(dissoc(s, 0)[0]))

update(s, [0, 'name'], (name: string) => name + 'dfg')[0]

update(s[0], 'name', (name: string) => name + 'hello')
expectError(update(s[0], 'name', (name: number) => name + 3))