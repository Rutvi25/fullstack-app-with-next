import "@testing-library/jest-dom";
import "whatwg-fetch";
import { render, screen, fireEvent } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { ChakraProvider } from "@chakra-ui/react";
import { renderHook } from "@testing-library/react-hooks";
import FetchMock from "jest-fetch-mock";
import { createMockRouter } from "../createMockRouter";
import Home from "../pages/index";
import Signup from "../pages/signup";
import Signin from "../pages/signin";
import Sidebar from "../components/sidebar";

import { useMe, usePlaylist } from "../lib/hooks";

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

  it("should render playlists hook", async () => {
    const { result } = renderHook(() => usePlaylist());
    expect(result.playlists).toBeUndefined();
  });
  it("should render playlists hook", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMe());
    expect(result.user).toBeUndefined();
    await waitForNextUpdate();
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
  });
});
