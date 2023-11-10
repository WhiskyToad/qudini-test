import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomerDetails from "../components/Customer";

describe("CustomerDetails Component", () => {
  test("renders correctly", async () => {
    const props = {
      name: "John Doe",
      emailAddress: "john@example.com",
      expectedTime: "2023-11-10T12:30:00.000Z",
    };

    render(<CustomerDetails {...props} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Expected Time:")).toBeInTheDocument();
    expect(screen.getByText("12:30:00 PM")).toBeInTheDocument();
  });
});
