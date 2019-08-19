"use strict";
const expect = require("chai").expect;
const muk = require("muk");
const httpx = require("httpx");
class Exception extends Error {}
const Http = require("../lib/http");

function Mock(response, body) {
  before(() => {
    muk(httpx, "request", (url, options) => {
      return Promise.resolve(response);
    });
    muk(httpx, "read", (response, encoding) => {
      return Promise.resolve(body);
    });
  });
  after(() => {
    muk.restore();
  });
}
describe("Base Http Request", () => {
  describe("Http class initial", () => {
    it("should ok with <http> protocol", () => {
      const http = new Http({
        endpoint: "http://openapi.wul.ai"
      });
      expect(http.endpoint).to.equal("http://openapi.wul.ai");
      expect(http.keepAliveAgent).to.be.an("object");
      expect(http.keepAliveAgent).to.have.property("protocol", "http:");
    });
    it("should ok with <https> protocol", () => {
      const http = new Http();
      expect(http.endpoint).to.equal("https://openapi.wul.ai");
      expect(http.keepAliveAgent).to.be.an("object");
      expect(http.keepAliveAgent).to.have.property("protocol", "https:");
    });
    it("should ok with <deaultHeaders>", () => {
      const http = new Http();
      const headers = http.defaultHeaders;
      expect(headers).to.have.keys(["accept", "date"]);
      expect(headers).to.have.property("accept", "application/json");
    });
    it("should ok with http headers lowerrify", () => {
      const http = new Http();
      const headers = http.headersKeyLowerify({
        Date: "now",
        ACCEPT: "application/json"
      });
      expect(headers).to.have.keys(["accept", "date"]);
      expect(headers).to.have.property("accept", "application/json");
    });
  });
  describe("Request(status=200) with json response should ok", () => {
    Mock(
      {
        statusCode: 200,
        headers: {
          "content-type": "application/json"
        }
      },
      JSON.stringify({ ok: true })
    );
    it("json response ok", async () => {
      const http = new Http();
      try {
        let json = await http.request("GET", "/");
        expect(json).to.be.an("object");
      } catch (err) {
        throw new Exception("reponse parse to json fail");
      }
    });
  });
  describe("Request(status>=400) with json response should ok", () => {
    Mock(
      {
        statusCode: 400,
        headers: {
          "content-type": "application/json"
        }
      },
      JSON.stringify({
        code: 50001,
        error: "登录超时"
      })
    );
    it("json response ok", async () => {
      const http = new Http();
      try {
        let json = await http.request("GET", "/");
        expect(json).to.be.an("object");
      } catch (err) {
        expect(err.code).to.equal(50001);
        expect(err.message).to.equal("code: 50001, 登录超时");
      }
    });
  });
  describe("Request with unexpect json string response should ok", () => {
    Mock(
      {
        statusCode: 200,
        headers: {
          "content-type": "application/json"
        }
      },
      "{'age': 3"
    );
    it("json response ok", async () => {
      const http = new Http();
      try {
        let json = await http.request("GET", "/");
        expect(json).to.be.an("object");
      } catch (err) {
        expect(err.name).to.equal("Server Error");
        expect(err.message).to.equal("response json format error.");
      }
    });
  });
  describe("Request with http.get should OK", () => {
    Mock(
      {
        statusCode: 200,
        headers: {
          "content-type": "application/json"
        }
      },
      JSON.stringify({
        ok: true
      })
    );
    it("should ok", async () => {
      const http = new Http();
      const json = await http.get("/", { age: 3 }, {}, {});
      expect(json).to.be.eql({ ok: true });
    });
  });
  describe("Request with http.post should OK", () => {
    Mock(
      {
        statusCode: 200,
        headers: {
          "content-type": "application/json"
        }
      },
      JSON.stringify({
        ok: true
      })
    );
    it("should ok", async () => {
      const http = new Http();
      const json = await http.post("/", {}, "10", {}, {});
      expect(json).to.be.eql({ ok: true });
    });
    it("should ok with query", async () => {
      const http = new Http();
      const json = await http.post("/", { age: 3 }, "10", {}, {});
      expect(json).to.be.eql({ ok: true });
    });
  });
  describe("Request with http.put should OK", () => {
    Mock(
      {
        statusCode: 200,
        headers: {
          "content-type": "application/json"
        }
      },
      JSON.stringify({
        ok: true
      })
    );
    it("should ok", async () => {
      const http = new Http();
      const json = await http.put("/", {}, "10", {}, {});
      expect(json).to.be.eql({ ok: true });
    });
    it("should ok with query", async () => {
      const http = new Http();
      const json = await http.put("/", { age: 3 }, "10", {}, {});
      expect(json).to.be.eql({ ok: true });
    });
  });

  describe("Request with http.delete should OK", () => {
    Mock(
      {
        statusCode: 200,
        headers: {
          "content-type": "application/json"
        }
      },
      JSON.stringify({
        ok: true
      })
    );
    it("should ok", async () => {
      const http = new Http();
      const json = await http.delete("/", {}, {}, {});
      expect(json).to.be.eql({ ok: true });
    });
  });
});
