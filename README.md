# Sprout

Change nested JS structures efficiently without mutating them.

**WARNING** This not ready for production use. Everything can potentially change (including the repo).

## Rationale

Helps to modify nested pure JavaScript structures (objects and arrays) without mutating them.

It does not deep-clone a structure but only modifies the changed parts, to achieve optimal performance and lets you compare parts with strict equality to detect what has changed.

It does not turn the structure into an immutable one (by calling `Object.freeze` or wrapping it). Therefore it's still possible to mutate the original object if you're not careful.

## Usage

`obj` won't be changed by all these operations:

```js
var sprout = require('sprout');

var obj = {a: 'foo', b: {c: 'bar'}};

sprout.assoc(obj, 'a', 'baz'); // => {a: 'baz', b: {c: 'bar'}}

sprout.assocIn(obj, ['b', 'c'], 'baz'); // => {a: 'foo', b: {c: 'baz'}}

sprout.assocIn(obj, ['b', 'd', 'e'], 'baz'); // => {a: 'foo', b: {c: 'bar', d: {e: 'baz'}}}

sprout.dissoc(obj, 'a'); // => {b: {c: 'bar'}}

sprout.dissocIn(obj, ['b', 'c']); // => {a: 'foo', b: {}}

sprout.get(obj, 'a') // => 'foo'

sprout.getIn(obj, ['b', 'c']) // => 'bar'

sprout.getIn(obj, ['b', 'd']) // => undefined

sprout.getIn(obj, ['b', 'd'], 'not found') // => 'not found'
```

See tests for more details.

## Inspiration

* React's [immutability helpers](http://facebook.github.io/react/docs/update.html) but more 'natural' to write. The advantage of React's way is that multiple changes to a structure can be done in one go (this will also be possible with the `model`).
* The API is modeled after Clojure's `assoc`, `assoc-in`, `get`, `get-in`, etc.
* [Cortex](https://github.com/mquan/cortex)


## Planned:

* low-level mutation-safe modifiers (assoc, assocIn, dissoc, dissocIn, updateIn, conj, cons)
* low-level mutating modifiers (set, setIn, deleteIn) (probably not part of the public API)
* high-level 'model' where updates can be batched synchronously (to only create one copy) or asynchronously (timeout or rAF), with a callback
* high-level 'history' which tracks model changes over time and provides undo/redo functionality.

## TODO

* Find a good name (which is available on npm)
* `updateIn(path, fn)` where `fn(oldValue) { return oldValue + newValue; }`
* etc. etc.

## Author

Jeremy Stucki, [Interactive Things](http://interactivethings.com)

## License

BSD, see LICENSE
