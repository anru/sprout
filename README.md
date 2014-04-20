# Sprout

Change nested JS structures efficiently without mutating them.

**WARNING** This not ready for production use. Everything can potentially change (including the repo).

## Rationale

Sprout helps to apply changes to nested plain JavaScript structures (objects and arrays) without mutating them.

It does not deep-clone a structure but only modifies the changed parts, to achieve optimal performance and lets you compare parts with strict equality to detect what has changed.

It does not turn the structure into an immutable one (by calling `Object.freeze` or wrapping it). Therefore it's still possible to mutate the original object if you're not careful.

## Usage

`obj` won't be changed by all these operations:

```js
var sprout = require('sprout');

var obj = {a: 'foo', b: {c: 'bar'}};

sprout.assoc(obj, 'a', 'baz'); // => {a: 'baz', b: {c: 'bar'}}

sprout.assoc(obj, ['b', 'c'], 'baz'); // => {a: 'foo', b: {c: 'baz'}}

sprout.assoc(obj, ['b', 'd', 'e'], 'baz'); // => {a: 'foo', b: {c: 'bar', d: {e: 'baz'}}}

sprout.dissoc(obj, 'a'); // => {b: {c: 'bar'}}

sprout.dissoc(obj, ['b', 'c']); // => {a: 'foo'}

sprout.get(obj, 'a') // => 'foo'

sprout.get(obj, ['b', 'c']) // => 'bar'

sprout.get(obj, ['b', 'd']) // => undefined

sprout.get(obj, ['b', 'd'], 'not found') // => 'not found'
```

See tests for more details.

## Inspiration

* React's [immutability helper](http://facebook.github.io/react/docs/update.html)
* Clojure's [Map functions](http://clojuredocs.org/quickref/Clojure%20Core#Collections+-+SequencesMaps)

## Author

Jeremy Stucki, [Interactive Things](http://interactivethings.com)

## License

BSD, see LICENSE
