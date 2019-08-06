"use strict";

const add = require("../lib/add");
const assert = require("assert");

describe("add num test", function() {
  let addNum = add(1, 3);
  assert.equal(addNum, 4);
});
