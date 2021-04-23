import { Router } from "express";
import { cacheGet, cacheSet } from "./cache";
import { CorrectAnswer, Hint, WrongAnswer } from "./models";
import { generateNumbers, highlight, shuffle } from "./util";

export const passwordGameRouter = Router();

passwordGameRouter.post("/verify-password", (req, res, next) => {
  const { hint = "", answer = "" } = req.body ?? {};
  const password = cacheGet(hint);

  if (password === undefined) {
    return res.sendStatus(404);
  }

  return password === answer
    ? res.json(CorrectAnswer(hint, answer))
    : res.json(WrongAnswer(hint, answer, password));
});

passwordGameRouter.get("/new-password", (req, res, next) => {
  const password = shuffle(generateNumbers());

  let hint = shuffle(password).join("");
  while (hint === password.join("")) {
    hint = shuffle(password).join("");
  }

  const success = cacheSet(hint, password.join(""));
  return success ? res.json(Hint(hint)) : res.sendStatus(500);
});
