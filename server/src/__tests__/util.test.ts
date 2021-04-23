import { isSymbol } from "node:util";
import { highlight } from "../util";

describe("highlight tests", () => {
  it("should return an empty array when either strings are empty", () => {
    const actual = [
      highlight("", ""),
      highlight("12345678", ""),
      highlight("", "12345678"),
    ];
    expect(actual.every((arr) => arr.length === 0)).toEqual(true);
  });

  it("should return every character when both strings are equal", () => {
    const pw = "12345678";
    const guess = "12345678";
    const actual = highlight(pw, guess);
    expect(actual).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });

  describe("even length args", () => {
    it("should return the correctly highlighted matching values - test case 1", () => {
      const pw = "12345678";
      const guess = "10305070";
      const actual = highlight(pw, guess);

      expect(actual).toEqual(["1", "3", "5", "7"]);
    });

    it("should return the correctly highlighted matching values - test case 2", () => {
      const pw = "12345678";
      const guess = "02040608";
      const actual = highlight(pw, guess);

      expect(actual).toEqual(["2", "4", "6", "8"]);
    });
  });

  describe("odd length args", () => {
    it("should return the correctly highlighted matching values - test case 1", () => {
      const pw = "1234567";
      const guess = "193958";
      const actual = highlight(pw, guess);

      expect(actual).toEqual(["1", "3", "5"]);
    });

    it("should return the correctly highlighted matching values - test case 2", () => {
      const pw = "1234567";
      const guess = "9284969";
      const actual = highlight(pw, guess);

      expect(actual).toEqual(["2", "4", "6"]);
    });
  });

  describe("different length args", () => {
    it("should return the correctly highlighted matching values - test case 1", () => {
      const pw = "123";
      const guess = "193958";
      const actual = highlight(pw, guess);

      expect(actual).toEqual(["1", "3"]);
    });

    it("should return the correctly highlighted matching values - test case 2", () => {
      const pw = "1234567";
      const guess = "928";
      const actual = highlight(pw, guess);

      expect(actual).toEqual(["2"]);
    });
  });
});
