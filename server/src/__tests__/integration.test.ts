import express from "express";
import request from "supertest";
import { passwordGameRouter } from "../routes";
import * as cache from "../cache";

let server: any;

describe("integration tests", () => {
  beforeEach(() => {
    server = express();
    server.use(express.json());
    server.use(passwordGameRouter);
  });

  describe("new-password", () => {
    it("should return a hint of 8 unique digits, in the range 0 <= d <= 10", (done) => {
      request(server)
        .get("/new-password")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(Object.keys(response.body ?? {}).length).toEqual(1);
          expect(response.body?.hint).toMatch(/^\d{8}$/);

          const digits = new Set<number>(
            response.body.hint.split("").map((d: string) => parseInt(d))
          );
          expect(digits.size).toEqual(8);
          for (let d of digits) {
            expect(d >= 0 && d < 10).toEqual(true);
          }
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("verify password", () => {
    it("should return correct response for wrong answer", (done) => {
      const password = "12345678";
      const hint = "87654321";
      const answer = "10000008";

      jest.spyOn(cache, "cacheGet").mockReturnValue(password);

      request(server)
        .post("/verify-password")
        .set("Content-Type", "application/json")
        .send({ hint, answer })
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual({
            correct: false,
            hint,
            answer,
            highlight: ["1", "8"],
          });
          done();
        });
    });

    it("should return correct response for correct answer", (done) => {
      const password = "12345678";
      const hint = "87654321";
      const answer = "12345678";

      jest.spyOn(cache, "cacheGet").mockReturnValue(password);

      request(server)
        .post("/verify-password")
        .set("Content-Type", "application/json")
        .send({ hint, answer })
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual({
            correct: true,
            hint,
            answer,
          });
          done();
        });
    });

    it("should return 404 for hint that doesnt exist", (done) => {
      const hint = "87654329";
      const answer = "12345678";

      jest.spyOn(cache, "cacheGet").mockReturnValue(undefined);

      request(server)
        .post("/verify-password")
        .set("Content-Type", "application/json")
        .send({ hint, answer })
        .expect(404, done);
    });
  });
});
