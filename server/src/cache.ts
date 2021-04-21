import NodeCache from "node-cache";

const passwordHintCache = new NodeCache({
  stdTTL: 3600,
  checkperiod: 3610,
  deleteOnExpire: true,
});

export const cacheGet = (hint: string) => passwordHintCache.get<string>(hint);
export const cacheHas = (hint: string) => passwordHintCache.has(hint);
export const cacheSet = (hint: string, password: string) =>
  passwordHintCache.set(hint, password);
export const cleanup = () => passwordHintCache.close();
