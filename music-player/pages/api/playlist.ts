import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { validateRoute } from "../../lib/auth";
import { Playlists } from "../../models";

export default validateRoute(
  async (
    req: NextApiRequest,
    res: NextApiResponse<Playlists[]>,
    user: { id: number }
  ) => {
    const playlists = await prisma.playlist.findMany({
      where: {
        userId: user.id,
      },
    });
    res.json(playlists);
  }
);
