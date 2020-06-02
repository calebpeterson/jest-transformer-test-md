```js
// The presence of this import indicates that ES6 modules are supported (via Babel)
import random from "./example/random";
```

# Random number generator

It should return a number between 0 and 1 by default

```js
const rand = random();

expect(rand).toBeLessThan(1);
```
