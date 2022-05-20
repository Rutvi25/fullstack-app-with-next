import { validateRoute } from "../../lib/auth.js";
import prisma from "../../lib/prisma.js";

export default validateRoute(async (req, res, user) => {
  const playlistsCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  });

  // console.log(playlistsCount);
  res.json({ ...user, playlistsCount });
});
