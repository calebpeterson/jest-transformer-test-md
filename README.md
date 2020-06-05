# Write your Jest tests in Markdown

Document public-facing APIs while simultaneously testing them.
The best part is your documentation _and_ test suites are now
trivially publishable!

## How it works

Write normal Markdown (like this `README.md`), and then include
your tests as multiline code blocks.

```js
expect(true).toBe(true);
```

**In fact, this `README.md` is part of the test suite for this repo 🤓**

## Configuring Jest

Check out this repository's [`jest.config.js`](./jest.config.js).

## Resources

Putting these here so I can find them later if/when this transformer is expanded:

- https://github.com/bitttttten/jest-transformer-mdx
- https://jestjs.io/docs/en/tutorial-react#custom-transformers
