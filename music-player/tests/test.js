import "@testing-library/jest-dom";
import "whatwg-fetch";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { ChakraProvider } from "@chakra-ui/react";
import { renderHook } from "@testing-library/react-hooks";
import FetchMock from "jest-fetch-mock";
import { setupServer } from "msw/node";
import { rest } from "msw";
import bcrypt from "bcrypt";
import { createMockRouter } from "../createMockRouter";
import Home from "../pages/index";
import Signup from "../pages/signup";
import Signin from "../pages/signin";
import Sidebar from "../components/sidebar";
import { useMe, usePlaylist } from "../lib/hooks";
import { createUser } from "./prisma-function";
import { prismaMock } from "../singleton";
import prisma from "../lib/prisma";

test("should create new user ", async () => {
  const user = {
    id: 1,
    email: "test@test.com",
    firstName: "test",
    lastName: "test",
    password: "password",
    playlists: [
      {
        id: 1,
        createdAt: "2022-05-16T04:53:04.503Z",
        updatedAt: "2022-06-22T04:49:13.025Z",
        name: "Playlist #2",
        userId: 2,
      },
      {
        id: 5,
        createdAt: "2022-05-16T04:53:04.503Z",
        updatedAt: "2022-06-22T04:49:57.404Z",
        name: "Playlist #8",
        userId: 2,
      },
      {
        id: 2,
        createdAt: "2022-05-16T04:53:04.503Z",
        updatedAt: "2022-06-22T05:01:40.222Z",
        name: "Playlist #5",
        userId: 2,
      },
    ],
  };
  prismaMock.user.create.mockResolvedValue(user);
  await expect(createUser(user)).resolves.toEqual({
    id: 1,
    email: "test@test.com",
    firstName: "test",
    lastName: "test",
    password: "password",
    playlists: [],
  });
});

const salt = bcrypt.genSaltSync();
const server = setupServer(
  rest.get("/api/me", (req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.json({
        id: 1,
        email: "user@test.com",
        firstName: "Scott",
        lastName: "Moss",
        password: bcrypt.hashSync("password", salt),
        playlistsCount: 7,
      })
    );
  })
);
beforeAll(() => server.listen());
afterAll(() => server.close());
// afterEach(() => server.resetHandlers());

describe("MSW", () => {
  beforeEach(async () => {
    render(
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    );
    await waitForElementToBeRemoved(() =>
      screen.getByText("undefined undefined")
    );
  });
  it("should reflect username", () => {
    expect(screen.getByText(/Scott Moss/i)).toBeInTheDocument();
  });
});

describe("api testing", () => {
  it("should fetch loggedin user data", async () => {
    console.warn(await fetch("http://localhost:3000/api/me"));
  });
});

describe("Test the useSWR hooks", () => {
  it("type of output should be object", () => {
    const { result } = renderHook(() => usePlaylist());
    expect(typeof result).toBe("object");
  });

  it("should render usePlaylist hook", async () => {
    const { result } = renderHook(() => usePlaylist());
    expect(result.playlists).toBeUndefined();
  });
  it("should render useMe hook", async () => {
    const { result } = renderHook(() => useMe());
    expect(result.user).toBeUndefined();
  });
});

describe("Home Page", () => {
  it("should render", () => {
    render(
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    );
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });
});

// for signup/signin form
describe("Signup Form", () => {
  it("render 2 input components for signin", () => {
    const { getByPlaceholderText } = render(<Signin />);
    expect(getByPlaceholderText(/email/i && /password/i)).toBeInTheDocument();
  });
  it("render 4 input components for signup", () => {
    const { getByPlaceholderText } = render(<Signup />);
    expect(
      getByPlaceholderText(
        /firstName/i && /lastName/i && /email/i && /password/i
      )
    ).toBeInTheDocument();
  });
  it("should render signup button", () => {
    render(<Signup /> || <Signin />);
    const button = screen.getByRole("button", { name: "signup" && "signin" });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });
  it("check the redirection of signup page", () => {
    const router = createMockRouter({ route: "signup" });
    render(
      <RouterContext.Provider value={router}>
        <Signin />
      </RouterContext.Provider>
    );
    fireEvent.click(screen.getByRole("button", { name: "signup" }));
    expect(router.push).toHaveBeenCalledWith("/signup");
  });
  it("check the redirection of signin page", () => {
    const router = createMockRouter({ route: "signup" });
    render(
      <RouterContext.Provider value={router}>
        <Signup />
      </RouterContext.Provider>
    );
    fireEvent.click(screen.getByRole("button", { name: "signin" }));
    expect(router.push).toHaveBeenCalledWith("/signin");
  });
});

describe("SideBar", () => {
  it("should render logout button", () => {
    render(<Sidebar />);
    const logout = screen.getByRole("button", { name: "Logout" });
    expect(logout).toBeInTheDocument();
  });
  it("renders Menu in sidebar component", () => {
    render(<Sidebar />);
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Search").closest("a")).toHaveAttribute(
      "href",
      "/search"
    );
    expect(screen.getByText("Your Library").closest("a")).toHaveAttribute(
      "href",
      "/library"
    );
  });
});
