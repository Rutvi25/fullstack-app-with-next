import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";
import { User } from "../../models";

export default validateRoute(
  async (
    req: NextApiRequest,
    res: NextApiResponse<User>,
    user: User
  ): Promise<void> => {
    const playlistsCount: number = await prisma.playlist.count({
      where: {
        userId: user.id,
      },
    });
    res.json({ ...user, playlistsCount });
  }
);
