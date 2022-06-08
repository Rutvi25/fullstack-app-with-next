import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { User } from "../../models";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<{ error: string } | User>
): Promise<void> => {
  const salt: string = bcrypt.genSaltSync();
  const { email, password, firstName, lastName }: User = req.body;

  let user: User;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
        firstName,
        lastName,
      },
    });
  } catch (e) {
    res.status(401).json({ error: "User already exists" });
    return;
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: <number>user.id,
      time: Date.now(),
    },
    "hello",
    { expiresIn: "8h" }
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
};
