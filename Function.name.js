(function() {

var fnNameMatchRegex = /^[\S\s]*?function\s+([^\(\s]*)\s*/;

function _name() {
  var match,
      name = "";
  if (this === Function || this === Function.prototype.constructor) {
    name = "Function";
  }
  else if (this !== Function.prototype) {
    match = ("" + this).match(fnNameMatchRegex);
    name = match && match[1] || "";
  }
  return name;
}

// Inspect the polyfill-ability of this browser
var needsPolyfill = !("name" in Function.prototype && "name" in (function x() {}));
var canDefineProp = typeof Object.defineProperty === "function" &&
  (function() {
    var result;
    try {
      Object.defineProperty(Function.prototype, "_xyz", {
        get: function() {
          return "blah";
        },
        configurable: true
      });
      result = Function.prototype._xyz === "blah";
      delete Function.prototype._xyz;
    }
    catch (e) {
      result = false;
    }
    return result;
  })();



// Add the "private" property for testing, even if the real property can be polyfilled
Function.prototype._name = _name;


// Polyfill it!
if (canDefineProp && needsPolyfill) {
  Object.defineProperty(Function.prototype, "name", {
    get: function() {
      var name = _name.call(this);

      // Since named function definitions have immutable names, also memoize the
      // output by defining the `name` property on this Function instance so
      // that this polyfill will not need to be invoked again
      Object.defineProperty(this, "name", {
        value: name,
        configurable: true,
        writable: false,
        enumerable: false
      });

      return name;
    },
    configurable: true,
    writable: false,
    enumerable: false
  });
}

})();
