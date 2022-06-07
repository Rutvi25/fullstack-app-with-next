import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../lib/auth.js";
import { User } from "../../lib/hooks.js";
import prisma from "../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse<User>, user: User) => {
    const playlistsCount: number = await prisma.playlist.count({
      where: {
        userId: user.id,
      },
    });
    res.json({ ...user, playlistsCount });
  }
);
