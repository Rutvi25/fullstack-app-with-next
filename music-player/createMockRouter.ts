import { NextRouter } from "next/router";

// const useRouter = jest.spyOn(require("next/router"), "useRouter");

// export function mockNextUseRouter(pathname: string) {
//   useRouter.mockImplementation(() => ({
//     pathname,
//     basePath: "",
//     route: "/",
//     push: async () => true,
//     prefetch: async () => undefined,
//   }));
// }

// import { rest } from "msw";
// import { getCookie } from "cookies-next";

export function createMockRouter(router: Partial<NextRouter>) {
  return {
    basePath: "",
    route: "/",
    push: jest.fn(),
    ...router,
  };
}

// export const handlers = [
//   rest.get("/user", (req, res, ctx) => {
//     // Check if the user is authenticated in this session
//     const isAuth = getCookie("TRAX_ACCESS_TOKEN");
//     if (!isAuth) {
//       // If not authenticated, respond with a 403 error
//       return res(
//         ctx.status(403),
//         ctx.json({
//           errorMessage: "Not authorized",
//         })
//       );
//     }
//     // If authenticated, return a mocked user details
//     return res(
//       ctx.status(200),
//       ctx.json({
//         username: "user@test.com",
//       })
//     );
//   }),
// ];
