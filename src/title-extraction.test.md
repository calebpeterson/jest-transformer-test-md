```js
const generator = require("./md-test-generator");
```

# Markdown header-based `it` block wrapping

```js
const expected = `
const random = require("./random");

describe("test-file.test.md", () => {
  it("the test", () => {
    expect(random()).toBeLessThan(1);
  });
});
`;

// The AST of a bit of markdown
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

expect(generator(mdast, "test-file.test.md")).toBe(expected.trim());
```
