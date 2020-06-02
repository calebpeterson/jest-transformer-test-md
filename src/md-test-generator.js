const path = require("path");
const { isEmpty, last } = require("./utils");

const joinChildrenAsText = (children) =>
  children
    .filter(({ value }) => Boolean(value))
    .map(({ value }) => value)
    .join("")
    .trim();

const ANNOTATIONS = {
  only: ".only",
  skip: ".skip",
  [null]: "",
};

const snippetsToSource = (snippets, title) =>
  snippets
    .map(({ snippet, meta }) =>
      `
  it${ANNOTATIONS[meta]}("${title}", () => {
    ${snippet}
  });
`.trim()
    )
    .join("\n\n");

const testToSource = ({ name, title, snippets }) =>
  name
    ? `
describe("${name}", () => {
  ${snippetsToSource(snippets, title)}
});
`.trim()
    : snippets.map(({ snippet }) => snippet).join("\n\n");

const testsToSource = (tests) => tests.map(testToSource).join("\n\n");

module.exports = function generator(mdast, filename) {
  const name = path.basename(filename);

  const tests = mdast.children.reduce((acc, node) => {
    const { meta } = node;

    try {
      if (node.type === "heading") {
        const title = joinChildrenAsText(node.children);
        const test = {
          name,
          title,
          depth: node.depth,
          snippets: [],
        };
        return [...acc, test];
      }

      if (node.type === "code") {
        const snippet = {
          snippet: node.value,
          meta,
        };

        // No headers have been seen yet, so this code
        // goes  outside of the top-most describe block
        if (isEmpty(acc)) {
          return [{ snippets: [snippet] }];
        }

        // This mutates the acc :(
        last(acc).snippets.push(snippet);
      }

      return acc;
    } catch (e) {
      console.error(`Error processing Markdown AST node`, node);
      throw e;
    }
  }, []);

  const code = testsToSource(tests);

  if (process.env.NODE_ENV === "development") {
    console.log(`Tests for ${filename}`);
    console.log(mdast);
    console.log(tests);
    console.log(code);
  }

  return code;
};
