// eslint-disable-next-line import/no-extraneous-dependencies
import { ChakraProvider } from "@chakra-ui/provider";
import { StoreProvider, useStoreRehydrated } from "easy-peasy";
import { extendTheme } from "@chakra-ui/react";
import "reset-css";

import PlayerLayout from "../components/playerLayout.jsx";
import { store } from "../lib/store.js";

const theme = extendTheme({
  colors: {
    gray: {
      100: "#f5f5f5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  components: {
    Buttons: {
      variants: {
        links: {
          ":focus": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

const WaitForStateRehydration = ({ children }) => {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : null;
};
const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider store={store}>
        <WaitForStateRehydration>
          {Component.authPage ? (
            <Component {...pageProps} />
          ) : (
            <PlayerLayout>
              <Component {...pageProps} />
            </PlayerLayout>
          )}
        </WaitForStateRehydration>
      </StoreProvider>
    </ChakraProvider>
  );
};

export default MyApp;
