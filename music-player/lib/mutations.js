import fetcher from "./fetcher.js";

export const auth = (mode, body: { email, password }) => {
  return fetcher(`/${mode}`, body);
};
