"use strict";

const path = require("path");
const { transform } = require("@babel/core");
const jestPreset = require("babel-preset-jest");
const babelJest = require("babel-jest");
const unified = require("unified");
const markdown = require("remark-parse");

const generate = require("./md-test-generator");

const transformer = babelJest.createTransformer({});

module.exports = {
  process(src, filename) {
    console.log(`Transforming ${path.relative(process.cwd(), filename)}...`);
    const mdast = unified().use(markdown, {}).parse(src);
    const code = generate(mdast, filename);

    const result = transformer.process(code, filename, {
      filename,
      presets: [jestPreset],
    });

    return result ? result.code : src;
  },
};
