# Sprout

Sprout provides a set of functions to help you work with nested data without all the headaches. Sprout never mutates the original data but returns new versions. This way, plain JavaScript objects (and arrays) can be effectively treated as if they were immutable.

One useful application of this would be to modify application state using Sprout and store each version in an array to get instant undo/redo functionality. Or you could only re-render changed subtrees of the application state by comparing with strict equality between versions.

## Working with nested data

### Retrieving nested values

Sprout's `get()` function allows you to gracefully retrieve nested values without blowing up when a key isn't present.

```js
var data = {a: {b: {c: 'foo'}}};
```

Normally, you'd retrieve the value of `c` like this:

```js
data.a.b.c; // => 'foo'
```

But what if the data isn't structured like you expected? Let's say

```js
data = {a: {b: {}}};

data.a.b.c; // => undefined
```

That still looks good, right? But what if your data looks like

```js
data = {};

data.a.b.c; // => Uh-oh! "TypeError: Cannot read property 'b' of undefined"
```

You *could* prevent this by checking for the existence of nested objects first:

```js
data.a && data.a.b ? data.a.b.c : void 0;
```

But who wants to write code like that?

Sprout to the rescue!

```js
sprout.get(data, ['a', 'b', 'c']) // => undefined
```

Additionally, you can supply a default return value as the third parameter to `sprout.get()`. This is useful for example when you expect an array and want to call its methods later.

```js
var z = sprout.get(data, ['x', 'y', 'z'], []);
z.filter(...);
```

### Modifying nested values

When you want to modify your data, you'll usually do it this way:

```js
data = {a: {b: {c: 'foo'}}};

data.a.b.c = 'bar';
```

This works fine in this particular case but has the same problem when your data isn't shaped like you expect.

```js
data = {};

data.a.b.c = 'bar'; // => Again: "TypeError: Cannot read property 'b' of undefined"
```

Whereas with Sprout you can do this without worrying about the existence of nested objects:

```js
sprout.assoc(data, ['a', 'b', 'c'], 'bar') // => {a: {b: {c: 'bar'}}}
```

Also, the naive approach of `data.a.b.c = x` *mutates* your original data. Although it is the most performant way of modifying data, it's bad for several reasons:

- The data may get used in other places. Modifying it in-place can lead to unexpected results and makes it harder to reason about
- You have no easy way of telling when it was changed
- There's no easy way to roll back to an earlier version of your data

Luckily, Sprout also has a solution for this problem.

## Immutability

Sprout never mutates your data. Whenever a change is applied, a new version is returned.

The easy approach to achieve this would be to create a deep copy of your data and then modify the copy. But especially for larger data structures, this is performance- and memory-intensive since you'll always copy everything instead of just the necessary parts.

### Structural sharing

For efficiency, Sprout uses *structural sharing*. This means it re-uses unmodified parts of your data. This is more performant and memory-efficient than deep-copying. It also lets you compare individual parts with strict equality to detect what has changed. Consider the following scenario:

```js
var data, updatedData;

data = {
  a: {b: {c: 1}},
  x: {y: {z: 1}}
};

updatedData = sprout.assoc(data, ['a', 'b', 'c'], 2);
```

- `updatedData.a.b.c === 2`
- `data` is not mutated, therefore `data.a.b.c === 1`
- The objects `updatedData.x` and `updatedData.x.y` are re-used from `data`, therefore `updatedData.x === data.x` and `updatedData.x.y === data.x.y` (and of course `updatedData.x.y.z === data.x.y.z`)

### No unnecessary changes

When an operation doesn't actually change a value (i.e. when the new value is strictly equal to the old one), Sprout doesn't create new objects at all and returns the original unmodified data instead.

```js
data = {a: 1};

updatedData = sprout.assoc(data, 'a', 1);
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
