import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../createMockRouter";
// import Home from "../pages/index";
import Signup from "../pages/signup";
import Signin from "../pages/signin";
// import AuthForm from "../components/authForm";

// describe("Home Page", () => {
//   it("should render", () => {
//     render(<Home />);
//     const home = screen.getByRole("GradientLayout");
//     expect(home).toBeInTheDocument();
//   });
// });

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
        <Signin />
      </RouterContext.Provider>
    );
    fireEvent.click(screen.getByRole("button", { name: "signup" }));
    expect(router.push).toHaveBeenCalledWith("/signup");
  });
});

// describe("Authenticate route", () => {
//   let req;
//   let res;
//   beforeEach(() => {
//     req = {};
//     res = {
//       status: jest.fn(() => res),
//       end: jest.fn(),
//     };
//   });
//   it("Should return 405 if the method is not post", async () => {
//     req.Method = "GET";
//     const response = await signup(req, res);
//     expect(res.status).toBeCalledWith(401);
//     // fail("not implemented");
//   });
// });
// describe("authentication", () => {
//   it("renders the auth page", () => {
//     <AuthForm />;
//     const button = screen.getByText("button", { name: "signin" });
//     expect(button).toBeInTheDocument();
//   });
// });
