import { NextRouter } from "next/router";

export function createMockRouter(router: Partial<NextRouter>) {
  return {
    basePath: "",
    route: "/",
    push: jest.fn(),
    ...router,
  };
}
