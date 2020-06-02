"use strict";

const { transform } = require("@babel/core");
const jestPreset = require("babel-preset-jest");

const unified = require("unified");
const markdown = require("remark-parse");

const generator = require("./md-test-generator");

module.exports = {
  process(src, filename) {
    console.log(`process ${filename}`);
    const mdast = unified().use(markdown, {}).parse(src);
    const code = generator(mdast, filename);

    const result = transform(code, {
      filename,
      presets: [jestPreset],
    });

    return result ? result.code : src;
  },
};
