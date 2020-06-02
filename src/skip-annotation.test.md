# It's possible to mark a test snippet to be skipped

## Skip this test

If this test runs, then it will fail

```js skip
expect(true).toBe(false);
```

## This test will run

But there does have to be at least one non-skipped test

```js
expect(true).toBe(true);
```
