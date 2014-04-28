# Sprout

Change nested JS structures efficiently without mutating them.

## Rationale

Sprout helps to apply changes to nested plain JavaScript structures (objects and arrays) without mutating them.

It does not deep-clone a structure but only modifies the changed parts, to achieve optimal performance and lets you compare parts with strict equality to detect what has changed.

It does not turn the structure into an immutable one (by calling `Object.freeze` or wrapping it). Therefore it's still possible to mutate the original object if you're not careful.

## Installation

```shell
npm install sprout-js --save
```

or

```shell
bower install sprout-js --save
```

## Usage

`obj` won't be changed by all these operations:

### assoc(obj, path, value)

```js
var assoc = require('sprout-js').assoc;
var obj = {a: 'foo', b: {c: 'bar'}};

// Change a property
assoc(obj, 'a', 'baz'); // => {a: 'baz', b: {c: 'bar'}}

// Change a nested property
assoc(obj, ['b', 'c'], 'baz'); // => {a: 'foo', b: {c: 'baz'}}

// New objects are created when they don't exist already
assoc(obj, ['b', 'd', 'e'], 'baz'); // => {a: 'foo', b: {c: 'bar', d: {e: 'baz'}}}

// Change multiple nested properties at once
assoc(obj, {b: {c: 'baz', d: 'blah'}}); // => {a: 'foo', b: {c: 'baz', d: 'blah'}}
```

### dissoc(obj, path)

```js
var dissoc = require('sprout-js').dissoc;
var obj = {a: 'foo', b: {c: 'bar', d: 1, e: 'baz'}};

// Remove a property
dissoc(obj, 'a'); // => {b: {c: 'bar', d: 1, e: 'baz'}}

// Remove a nested property (empty objects are removed)
dissoc(obj, ['b', 'c']); // => {a: 'foo', b: {d: 1, e: 'baz'}}

// Remove multiple nested properties at once (where keys match)
dissoc(obj, {b: {c: true, d: true}}); // => {a: 'foo', b: {e: 'baz'}}
```

### update(obj, path, fn, [args])

```js
var update = require('sprout-js').update;
var obj = {a: 1, b: {c: 2}};

// Update a property
update(obj, 'a', function(v) { return v + 1; }); // => {a: 2, b: {c: 2}}

// Update a nested property
update(obj, ['b', 'c'], function(v) { return v + 1; }); // => {a: 1, b: {c: 3}}

// Supply additional arguments to fn
function add(x, y) { return x + y; }
update(obj, ['b', 'c'], add, 5); // => {a: 1, b: {c: 7}}
```

### get(obj, path, [defaultValue])

```js
var get = require('sprout-js').get;
var obj = {a: 'foo', b: {c: 'bar'}};

// Get a property
get(obj, 'a') // => 'foo'

// Get a nested property
get(obj, ['b', 'c']) // => 'bar'

// Getting an non-existing property
get(obj, ['b', 'd']) // => undefined

// Define a default return value for non-existing properties
get(obj, ['b', 'd'], 'not found') // => 'not found'
```

See tests for more details.

## Inspiration

* React's [immutability helper](http://facebook.github.io/react/docs/update.html)
* Clojure's [Map functions](http://clojuredocs.org/quickref/Clojure%20Core#Collections+-+SequencesMaps)

## Author

Jeremy Stucki, [Interactive Things](http://interactivethings.com)

## License

BSD, see LICENSE
