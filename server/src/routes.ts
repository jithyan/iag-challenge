import { Router } from "express";
import { cacheGet, cacheSet } from "./cache";
import {
  CorrectAnswer,
  Hint,
  IVerifyPasswordRequest,
  IVerifyPasswordResponse,
  WrongAnswer,
  INewPasswordResponseBody,
} from "./models";
import { generateNumbers, shuffle } from "./util";

export const passwordGameRouter = Router();

passwordGameRouter.post<{}, IVerifyPasswordResponse, IVerifyPasswordRequest>(
  "/verify-password",
  (req, res) => {
    const { hint = "", answer = "" } = req.body ?? {};
    const password = cacheGet(hint);

    if (password === undefined) {
      return res.sendStatus(404);
    }

    return password === answer
      ? res.json(CorrectAnswer(hint, answer))
      : res.json(WrongAnswer(hint, answer, password));
  }
);

passwordGameRouter.get<{}, INewPasswordResponseBody>(
  "/new-password",
  (_, res) => {
    const password = shuffle(generateNumbers());

    let hint = shuffle(password).join("");
    while (hint === password.join("")) {
      hint = shuffle(password).join("");
    }

    const success = cacheSet(hint, password.join(""));
    return success ? res.json(Hint(hint)) : res.sendStatus(500);
  }
);
