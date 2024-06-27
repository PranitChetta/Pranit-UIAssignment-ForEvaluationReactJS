import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../components/App";
import { transactionCalculator, API } from "../utils";

const mockData = {
  summaryByCustomer: [
    {
      custid: 1,
      name: "Acme",
      monthNumber: 4,
      month: "May",
      numTransactions: 3,
      points: 190,
    },
    {
      custid: 1,
      name: "Acme",
      monthNumber: 5,
      month: "June",
      numTransactions: 2,
      points: 50,
    },
    {
      custid: 1,
      name: "Acme",
      monthNumber: 6,
      month: "July",
      numTransactions: 4,
      points: 598,
    },
    {
      custid: 2,
      name: "Century",
      monthNumber: 4,
      month: "May",
      numTransactions: 2,
      points: 150,
    },
    {
      custid: 2,
      name: "Century",
      monthNumber: 5,
      month: "June",
      numTransactions: 2,
      points: 50,
    },
    {
      custid: 2,
      name: "Century",
      monthNumber: 6,
      month: "July",
      numTransactions: 2,
      points: 548,
    },
    {
      custid: 3,
      name: "Sallys Startup",
      monthNumber: 5,
      month: "June",
      numTransactions: 1,
      points: 90,
    },
  ],
  pointsPerTransaction: [
    {
      amt: 120,
      name: "Acme",
      custid: 1,
      transactionDt: "05-01-2019",
      points: 90,
      month: 4,
    },
    {
      amt: 75,
      name: "Acme",
      custid: 1,
      transactionDt: "05-21-2019",
      points: 50,
      month: 4,
    },
    {
      amt: 94,
      name: "Acme",
      custid: 1,
      transactionDt: "05-21-2019",
      points: 50,
      month: 4,
    },
    {
      amt: 10,
      name: "Acme",
      custid: 1,
      transactionDt: "06-01-2019",
      points: 0,
      month: 5,
    },
    {
      amt: 75,
      name: "Acme",
      custid: 1,
      transactionDt: "06-21-2019",
      points: 50,
      month: 5,
    },
    {
      amt: 200,
      name: "Acme",
      custid: 1,
      transactionDt: "07-01-2019",
      points: 250,
      month: 6,
    },
    {
      amt: 1,
      name: "Acme",
      custid: 1,
      transactionDt: "07-04-2019",
      points: 0,
      month: 6,
    },
    {
      amt: 80,
      name: "Acme",
      custid: 1,
      transactionDt: "07-03-2019",
      points: 50,
      month: 6,
    },
    {
      amt: 224,
      name: "Acme",
      custid: 1,
      transactionDt: "07-21-2019",
      points: 298,
      month: 6,
    },
    {
      amt: 125,
      name: "Century",
      custid: 2,
      transactionDt: "05-01-2019",
      points: 100,
      month: 4,
    },
    {
      amt: 75,
      name: "Century",
      custid: 2,
      transactionDt: "05-21-2019",
      points: 50,
      month: 4,
    },
    {
      amt: 10,
      name: "Century",
      custid: 2,
      transactionDt: "06-01-2019",
      points: 0,
      month: 5,
    },
    {
      amt: 75,
      name: "Century",
      custid: 2,
      transactionDt: "06-21-2019",
      points: 50,
      month: 5,
    },
    {
      amt: 200,
      name: "Century",
      custid: 2,
      transactionDt: "07-01-2019",
      points: 250,
      month: 6,
    },
    {
      amt: 224,
      name: "Century",
      custid: 2,
      transactionDt: "07-21-2019",
      points: 298,
      month: 6,
    },
    {
      amt: 120,
      name: "Sallys Startup",
      custid: 3,
      transactionDt: "06-21-2019",
      points: 90,
      month: 5,
    },
  ],
  totalPointsByCustomer: [
    {
      name: "Acme",
      points: 838,
    },
    {
      name: "Century",
      points: 748,
    },
    {
      name: "Sallys Startup",
      points: 90,
    },
  ],
};

jest.mock("../utils", () => ({
  ...jest.requireActual("../utils"),
  API: "https://example.com/api", // Mock the API endpoint
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
        monthNumber: 1,
      },
    ],
    pointsPerTransaction: [
      {
        custid: 1,
        month: 1,
        transactionDt: "2023-01-15",
        amt: 100,
        points: 30,
      },
    ],
  };

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      }),
    );
    transactionCalculator.mockReturnValue(mockTransactionData);
  });

  test("renders loading state initially", async () => {
    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test.skip("renders data correctly after fetching", async () => {
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
