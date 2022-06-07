import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Auth } from "../../lib/mutations.js";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { email, password }: Auth = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now(),
      },
      "hello",
      {
        expiresIn: "8h",
      }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("TRAX_ACCESS_TOKEN", token, {
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
      })
    );

    res.json(user);
  } else {
    res.status(401);
    res.json({ error: "Email or Password is wrong" });
  }
};
