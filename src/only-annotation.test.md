# It's possible to mark a block as `only`

## Only run this test

```js only
expect(true).toBe(true);
```

## This test is excluded

But if this test runs, then the suite fails

```js
expect(true).toBe(false);
```
