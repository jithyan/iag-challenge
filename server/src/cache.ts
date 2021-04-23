import NodeCache from "node-cache";

const passwordHintCache = new NodeCache({
  stdTTL: 3600,
  checkperiod: 3610,
  deleteOnExpire: true,
});

export const cacheGet = (hint: string): string | undefined =>
  passwordHintCache.get<string>(hint);

export const cacheHas = (hint: string): boolean => passwordHintCache.has(hint);

export const cacheSet = (hint: string, password: string): boolean => {
  console.table({ hint, password });
  return passwordHintCache.set(hint, password);
};
