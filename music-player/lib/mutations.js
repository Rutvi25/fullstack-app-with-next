import fetcher from "./fetcher.js";

export const auth = (mode, body) => {
  return fetcher(`/${mode}`, body);
};
