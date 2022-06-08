import { User } from "../models";
import fetcher from "./fetcher";

export const auth = (mode: "signin" | "signup", body: User) => {
  return fetcher(`/${mode}`, body);
};
