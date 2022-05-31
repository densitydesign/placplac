import { buildURLSearchParams, queryStringToRecord, urlSearchParamsToString } from "./url";

describe("URL utils", () => {
  describe("#buildURLSearchParams", () => {
    it("should work 'normally' with normal single values cases", () => {
      const data = { a: "abc", b: "def" };
      expect(buildURLSearchParams(data).toString()).toStrictEqual(new URLSearchParams(data).toString());
    });

    it("should encode arrays using [] suffix", () => {
      const data = { a: "abc", b: ["def", "ghi"] };
      const params = buildURLSearchParams(data);
      expect([...params.getAll("a")]).toStrictEqual(["abc"]);
      expect([...params.getAll("b")]).toStrictEqual(["def", "ghi"]);
    });
  });

  describe("#urlSearchParamsToString", () => {
    it("should work 'normally' with normal single values cases", () => {
      const params = new URLSearchParams();
      params.append("a", "abc");
      params.append("b", "def");
      expect(urlSearchParamsToString(params)).toBe(params.toString());
    });

    it("should detect arrays", () => {
      const params = new URLSearchParams();
      params.append("a", "abc");
      params.append("b", "def");
      params.append("b", "ghi");
      expect(urlSearchParamsToString(params)).toStrictEqual("a=abc&b[]=def&b[]=ghi");
    });
  });

  describe("#queryStringToRecord", () => {
    it("should work 'normally' with normal single values cases", () => {
      expect(queryStringToRecord("a=abc&b=def")).toStrictEqual({ a: "abc", b: "def" });
    });

    it("should detect arrays", () => {
      expect(queryStringToRecord("a=abc&b[]=def&b[]=ghi")).toStrictEqual({ a: "abc", b: ["def", "ghi"] });
    });

    it("should be flexible about the `[]` suffix", () => {
      expect(queryStringToRecord("a=abc")).toStrictEqual({ a: "abc" });
      expect(queryStringToRecord("a[]=abc")).toStrictEqual({ a: "abc" });
      expect(queryStringToRecord("a=abc&a=def")).toStrictEqual({ a: ["abc", "def"] });
      expect(queryStringToRecord("a[]=abc&a[]=def")).toStrictEqual({ a: ["abc", "def"] });
    });
  });
});
