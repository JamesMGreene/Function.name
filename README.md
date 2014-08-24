# `Function.name`

A polyfill for ECMAScript 6's [`Function.name`](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-name) for IE9+.  All of the other modern browsers already support this functionality.

For IE < 9, you can use `fn._name()` instead.


## Usage

```js
function hello() {
  /* ... */
}
console.log(hello.name);  // "hello"
```


## Other Documentation

MDN docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
