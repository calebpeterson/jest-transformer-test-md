const path = require("path");

const isEmpty = (array) => !array || array.length === 0;

const last = (array) =>
  array && array.length > 0 ? array[array.length - 1] : undefined;

const joinChildrenAsText = (children) =>
  children
    .filter(({ value }) => Boolean(value))
    .map(({ value }) => value)
    .join("")
    .trim();

const code2snippets = (code, title) =>
  code
    .map((snippet) =>
      `
  it("${title}", () => {
    ${snippet}
  });
`.trim()
    )
    .join("\n\n");

const test2code = ({ title, code }) =>
  title
    ? `
describe("${title}", () => {
  ${code2snippets(code, title)}
});
`.trim()
    : code.join("\n\n");

const tests2code = (tests) => {
  return tests.map(test2code).join("\n\n");
};

module.exports = function generator(mdast, filename) {
  const tests = mdast.children.reduce((acc, node) => {
    try {
      if (node.type === "heading") {
        const title = joinChildrenAsText(node.children);
        return [...acc, { title, depth: node.depth, code: [] }];
      }
      if (node.type === "code") {
        if (isEmpty(acc)) {
          return [{ code: [node.value] }];
        }
        last(acc).code.push(node.value);
      }
      return acc;
    } catch (e) {
      console.error(`Error processing MDAST node`, node);
      throw e;
    }
  }, []);

  console.log(`Tests for ${filename}`);
  console.log(mdast);
  console.log(tests);

  const code = tests2code(tests);

  console.log(code);

  return code;
};
