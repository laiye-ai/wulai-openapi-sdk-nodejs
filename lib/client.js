"use strict";
const SDKBase = require("./core/sdkBase");
const Dialogue = require("./api/dialogue");
const Knowledge = require("./api/knowledge");
const Statistics = require("./api/statistics");
const User = require("./api/user");

function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
class Client extends SDKBase  {}
applyMixins(Client, [Dialogue, Knowledge, Statistics, User]);
module.exports = Client

