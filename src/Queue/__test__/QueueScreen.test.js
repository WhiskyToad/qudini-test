import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import QueueScreen from "../QueueScreen";
import userEvent from "@testing-library/user-event";

// Mocking the fetchQueueData function
jest.mock("../../mockApi", () => ({
  fetchQueueData: jest.fn(() =>
    Promise.resolve({
      json: jest.fn(() => ({
        queueData: {
          queue: {
            customersToday: [
              {
                id: 1,
                customer: {
                  name: "John Doe",
                  emailAddress: "john@example.com",
                },
                expectedTime: "2023-11-10T12:30:00.000Z",
              },
              {
                id: 2,
                customer: {
                  name: "Bohn Doe",
                  emailAddress: "bohn@example.com",
                },
                expectedTime: "2023-11-10T12:30:00.000Z",
              },
            ],
          },
        },
      })),
    })
  ),
}));

describe("QueueScreen Component", () => {
  test("renders correctly", () => {
    render(<QueueScreen />);
    expect(
      screen.getByPlaceholderText("Filter by customer name")
    ).toBeInTheDocument();
  });

  test("filters customers correctly", async () => {
    render(<QueueScreen />);

    // Type something in the input
    userEvent.type(
      screen.getByPlaceholderText("Filter by customer name"),
      "john"
    );

    // Check if the customer is rendered
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.queryByText("Bohn Doe")).not.toBeInTheDocument();
    });
  });
});
