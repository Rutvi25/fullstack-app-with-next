import GradientLayout from "../../components/gradientLayout.jsx";
import SongsTable from "../../components/songsTable.jsx";
import { validateToken } from "../../lib/auth.js";
import prisma from "../../lib/prisma.js";

const getBGColor = (id) => {
  const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "teal",
    "gray",
    "purple",
    "orange",
  ];
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};
const Playlist = ({ playlist }) => {
  const color = getBGColor(playlist.id);
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;

  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};

export default Playlist;
