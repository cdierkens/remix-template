import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { H1 } from "./h1";

describe("H1", () => {
  it("renders children", () => {
    render(<H1>Hello World</H1>);

    expect(screen.getByRole("heading")).toHaveTextContent("Hello World");
  });
});
