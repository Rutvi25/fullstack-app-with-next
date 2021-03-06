import { Box, Flex, Text } from "@chakra-ui/layout";
import { useStoreState } from "easy-peasy";
import { StoreModel } from "../models";
import Player from "./player";

const PlayerBar = (): JSX.Element => {
  const songs = useStoreState((state: StoreModel) => state.activeSongs);
  const activeSong = useStoreState((state: StoreModel) => state.activeSong);
  return (
    <Box height="100%" width="100vw" padding="10px">
      <Flex align="center">
        {activeSong ? (
          <Box padding="20px" color="white" width="30%">
            <Text fontSize="large">{activeSong.name}</Text>
            <Text fontSize="sm">{activeSong.artist.name}</Text>
          </Box>
        ) : null}
        <Box width="40%">
          {activeSong ? <Player songs={songs} activeSong={activeSong} /> : null}
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
