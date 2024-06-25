import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import { transactionCalculator, API } from "./utils";

jest.mock("./utils", () => ({
  ...jest.requireActual("./utils"),
  transactionCalculator: jest.fn(),
}));

describe("App component", () => {
  const mockTransactionData = {
    summaryByCustomer: [
      {
        name: "John Doe",
        month: "January",
        numTransactions: 5,
        points: 150,
        custid: 1,
      },
    ],
    pointsPerTransaction: [
      {
        custid: 1,
        month: "January",
        transactionDt: "2023-01-15",
        amt: 100,
        points: 30,
      },
    ],
  };

  beforeEach(() => {
    transactionCalculator.mockReturnValue(mockTransactionData);
  });

  test("renders loading state initially", async () => {
    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state when there is an error", async () => {
    transactionCalculator.mockImplementation(() => {
      throw new Error("API Error");
    });
    render(<App />);
    await waitFor(() =>
      expect(
        screen.getByText(
          "Something went wrong while fetching data! Error: API Error",
        ),
      ).toBeInTheDocument(),
    );
  });

  test("renders data correctly after fetching", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("January")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });
});
