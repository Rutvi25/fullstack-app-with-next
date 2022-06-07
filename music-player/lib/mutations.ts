import fetcher from "./fetcher.js";

export interface Auth {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export const auth = (mode: "signin" | "signup", body: Auth) => {
  return fetcher(`/${mode}`, body);
};
