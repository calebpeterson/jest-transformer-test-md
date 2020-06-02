```js
const generator = require("./md-test-generator");
```

# Describe block wrapping

The tests should always be included within a describe block.

```js
const expected = `
const random = require("./random");

describe("the test", () => {
  it("the test", () => {
    expect(random()).toBeLessThan(1);
  });
});`;

const mdast = {
  type: "root",
  children: [
    {
      type: "code",
      lang: "js",
      meta: null,
      value: 'const random = require("./random");',
    },
    {
      type: "heading",
      depth: 1,
      children: [{ type: "text", value: "the test" }],
    },
    {
      type: "code",
      lang: "js",
      meta: null,
      value: "expect(random()).toBeLessThan(1);",
    },
  ],
};

expect(generator(mdast)).toBe(expected.trim());
```

# It block wrapping

The textual element immediately preceding a code block will provide the `it(...)` message

# It's possible to mark a block as `only`

```js only
```

# It's possible to mark a block as `skip`

```js skip
```
