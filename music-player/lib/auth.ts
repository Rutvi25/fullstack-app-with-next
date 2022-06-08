import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../models";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token: string = req.cookies.TRAX_ACCESS_TOKEN;

    if (token) {
      let user: User;
      try {
        const { id } = <{ id: number }>jwt.verify(token, "hello");
        // console.log(id, typeof id);
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error("Not real user");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Not Authorizied" });
        return;
      }
      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "Not Authorizied" });
  };
};

export const validateToken = (token: string) => {
  const user = jwt.verify(token, "hello");
  // console.log(user);
  return user;
};
