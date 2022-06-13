import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import NextImage from "next/image";

import { auth } from "../lib/mutations";

interface AppProps {
  mode: "signin" | "signup";
  option: "signin" | "signup";
}
const AuthForm = ({ mode, option }: AppProps): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setfirstName] = useState<string>("");
  const [lastName, setlastName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router: NextRouter = useRouter();

  const handleSubmit = async (e: {
    preventDefault: () => void;
  }): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    await auth(mode, { email, password, firstName, lastName });
    setIsLoading(false);
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <NextImage src="/logo.svg" height={60} width={120} />
      </Flex>
      <Flex justify="center" align="center" fontSize="20px">
        <h1>{mode}</h1>
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <>
                <Input
                  required
                  placeholder="firstName"
                  type="text"
                  onChange={(e) => setfirstName(e.target.value)}
                />
                <Input
                  required
                  placeholder="lastName"
                  type="text"
                  onChange={(e) => setlastName(e.target.value)}
                />
              </>
            )}
            <Input
              required
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              required
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                "&:hover": {
                  bg: "green.300",
                },
              }}
            >
              {mode}
            </Button>
            <Button bg="transparent" onClick={() => router.push(`/${option}`)}>
              {option}
            </Button>
          </form>
        </Box>
        {}
      </Flex>
    </Box>
  );
};

export default AuthForm;
