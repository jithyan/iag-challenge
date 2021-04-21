import { Router } from "express";
import { cacheGet, cacheSet } from "../cache";
import { CorrectAnswer, Hint, IncorrectAnswer } from "../models";
import { generateNumbers, highlight, shuffle } from "../util";

export const passwordGame = Router();

passwordGame.post("/verify-password", (req, res, next) => {
  const { hint = "", answer = "" } = req.body ?? {};
  const actual = cacheGet(hint);

  if (actual === undefined) {
    return res.sendStatus(404);
  }

  return actual === answer
    ? res.json(CorrectAnswer(hint, answer))
    : res.json(IncorrectAnswer(hint, answer, actual));
});

passwordGame.get("/new-password", (req, res, next) => {
  const password = shuffle(generateNumbers());
  let hint = shuffle(password).join("");

  while (hint === password.join("")) {
    hint = shuffle(password).join("");
  }

  const success = cacheSet(hint, password.join(""));

  console.log("password", password.join(""));

  return success ? res.json(Hint(hint)) : res.sendStatus(500);
});
