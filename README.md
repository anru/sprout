# Sprout

Sprout is a collection of functions to make your life easier when dealing with nested data in JavaScript. Sprout never changes the original data but returns new versions. This way, plain JavaScript objects (and arrays) can be effectively treated as if they were immutable.

For example you could modify application state using Sprout and store each version in an array to get instant undo/redo functionality. Or you could only re-render changed subtrees of the application state by comparing with strict equality between versions.

## How Sprout works

For efficiency, Sprout uses *structural sharing*. This means it does not naively deep-copy data but re-uses unmodified parts. This is more performant and memory-efficient than deep copying. It also lets you compare parts with strict equality to detect what has changed. Consider the following scenario:

```js
var assoc = require('sprout-data').assoc;

var data = {
  a: {b: {c: 1}},
  x: {y: {z: 1}}
};

var updatedData = assoc(data, ['a', 'b', 'c'], 2);
```

* `updatedData.a.b.c === 2`
* `data` is not mutated, therefore `data.a.b.c === 1`
* The objects `updatedData.x` and `updatedData.x.y` are re-used from `data`, therefore `updatedData.x === data.x` and `updatedData.x.y === data.x.y` (and of course `updatedData.x.y.z === data.x.y.z`)

Additionally, most of Sprout's functions return the original data when they haven't changed anything.

```js
var assoc = require('sprout-data').assoc;

var data = {a: 1};

var updatedData = assoc(data, 'a', 1);
```

In this case, `updatedData === data`.

The data itself is not made immutable (by calling `Object.freeze` or wrapping it). Therefore it's still possible to mutate the original data using other methods if you're not careful.

## Installation

```shell
npm install sprout-data --save
```

or

```shell
bower install sprout-data --save
```

or just download and include `sprout.js` or `sprout.min.js` in your page.

## API

The *path* argument can be a single key or an array of keys to access nested properties.

### get(obj, path, [defaultValue])

Get a (nested) property from an object. Returns `undefined` or – if provided – the *defaultValue* if any key in the path doesn't exist.

```js
var get = require('sprout-data').get;
var obj = {a: 'foo', b: {c: 'bar'}};

// Get a property
get(obj, 'a') // => 'foo'

// Get a nested property
get(obj, ['b', 'c']) // => 'bar'

// Getting an non-existing property
get(obj, ['b', 'd']) // => undefined

// Gracefully handles non-existing keys (as opposed to obj.x.y which would throw an error because it can't access y of obj.x)
get(obj, ['x', 'y']) // => undefined

// Define a default return value for non-existing properties
get(obj, ['b', 'd'], 'not found') // => 'not found'
```

### assoc(obj, path, value, [path2, value2, ...])

Assigns a value to a *path* in *obj*. Multiple path-value pairs can be specified.

```js
var assoc = require('sprout-data').assoc;
var obj = {a: 'foo', b: {c: 'bar'}};

// Change a property
assoc(obj, 'a', 'baz'); // => {a: 'baz', b: {c: 'bar'}}

// Change a nested property
assoc(obj, ['b', 'c'], 'baz'); // => {a: 'foo', b: {c: 'baz'}}

// New objects are created when they don't exist already
assoc(obj, ['b', 'd', 'e'], 'baz'); // => {a: 'foo', b: {c: 'bar', d: {e: 'baz'}}}

// Change multiple nested properties at once
assoc(obj, ['b', 'c'], 'baz', ['b', 'd'], 'blah'}}); // => {a: 'foo', b: {c: 'baz', d: 'blah'}}
```

### dissoc(obj, path, [path2, ...])

Removes a property at *path* from *obj*. Multiple paths can be specified to remove multiple properties. If all properties are removed from an object, the object itself will also be removed.

```js
var dissoc = require('sprout-data').dissoc;
var obj = {a: 'foo', b: {c: 'bar', d: 1, e: 'baz'}};

// Remove a property
dissoc(obj, 'a'); // => {b: {c: 'bar', d: 1, e: 'baz'}}

// Remove a nested property (empty objects are removed)
dissoc(obj, ['b', 'c']); // => {a: 'foo', b: {d: 1, e: 'baz'}}

// Remove multiple nested properties at once (where keys match)
dissoc(obj, ['b', 'c'], ['b', 'd']); // => {a: 'foo', b: {e: 'baz'}}

// Removing all properties of an object also removes the object from its parent
dissoc(obj, ['b', 'c'], ['b', 'd'], ['b', 'e']); // => {a: 'foo'}
```

### update(obj, path, fn, [args])

Applies *fn* to a property at *path* from *obj*. Optional *args* will be supplied to *fn*.

```js
var update = require('sprout-data').update;
var obj = {a: 1, b: {c: 2}};

// Update a property
update(obj, 'a', function(v) { return v + 1; }); // => {a: 2, b: {c: 2}}

// Update a nested property
update(obj, ['b', 'c'], function(v) { return v + 1; }); // => {a: 1, b: {c: 3}}

// Supply additional arguments to fn
function add(x, y) { return x + y; }
update(obj, ['b', 'c'], add, 5); // => {a: 1, b: {c: 7}}
```

### merge(obj, obj2, [obj3, ...])

(Shallow) merge *obj2*'s properties into *obj*. Properties of the rightmost object will override existing properties.

```js
var merge = require('sprout-data').merge;
var obj = {a: 1, b: {c: 2}};

// Merge
merge(obj, {d: 5}); // => {a: 1, b: {c: 2}, d: 5}

// Merge multiple objects
merge(obj, {d: 5, e: 6}, {d: 10}); // => {a: 1, b: {c: 2}, d: 10, e: 6}
```

### deepMerge(obj, obj2, [obj3, ...])

Deep-merge *obj2*'s properties into *obj*. Properties of the rightmost object will override existing properties. Non-existing objects will be created.

```js
var deepMerge = require('sprout-data').deepMerge;
var obj = {a: 1, b: {c: 2, d: 3}};

// Deep merge
deepMerge(obj, {b: {d: 5}}); // => {a: 1, b: {c: 2, d: 5}}

// Non-existing objects along the path will be created
deepMerge(obj, {x: {y: 42}}); // => {a: 1, b: {c: 2, d: 3}, x: {y: 42}}
```

See tests for more details.

## Inspiration

* The API is heavily inspired by Clojure's [Map functions](http://clojuredocs.org/quickref/Clojure%20Core#Collections+-+SequencesMaps).
* The same structural sharing approach is used by React's [immutability helper](http://facebook.github.io/react/docs/update.html).

## Author

Jeremy Stucki, [Interactive Things](http://interactivethings.com)

## License

BSD, see LICENSE
