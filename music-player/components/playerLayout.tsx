import { Box } from "@chakra-ui/layout";
import PlayerBar from "./playerBar";
import Sidebar from "./sidebar";

const PlayerLayout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" left="0" top="0" width="250px">
        <Sidebar />
      </Box>
      <Box marginLeft="250px" marginBottom="100px">
        <Box height="calc(100vh - 100px)">{children}</Box>
      </Box>
      <Box left="0" bottom="0" position="absolute">
        <PlayerBar />
      </Box>
    </Box>
  );
};

export default PlayerLayout;
