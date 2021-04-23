import { rest } from "msw";
import { setupServer } from "msw/node";

export const mockServer = setupServer();

export function setHintResponse(data: any, status = 200) {
  mockServer.use(
    rest.get("http://localhost:5000/new-password", (req, res, ctx) => {
      return res(ctx.json(data), ctx.status(status));
    })
  );
}

export function setVerifyResponse(data: any, status = 200) {
  mockServer.use(
    rest.post("http://localhost:5000/verify-password", (req, res, ctx) => {
      return res(ctx.json(data), ctx.status(status));
    })
  );
}
