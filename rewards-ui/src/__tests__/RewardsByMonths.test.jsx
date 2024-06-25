import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RewardsByMonths from "./RewardsByMonths";

describe("RewardsByMonths component", () => {
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
      {
        custid: 1,
        month: "February",
        transactionDt: "2023-02-10",
        amt: 150,
        points: 45,
      },
    ],
  };

  test("renders table headers correctly", () => {
    const { getByText } = render(
      <RewardsByMonths transactionData={mockTransactionData} />,
    );
    expect(getByText("Customer")).toBeInTheDocument();
    expect(getByText("Month")).toBeInTheDocument();
    expect(getByText("# of Transactions")).toBeInTheDocument();
    expect(getByText("Reward Points")).toBeInTheDocument();
  });

  test("renders customer data correctly", () => {
    const { getByText } = render(
      <RewardsByMonths transactionData={mockTransactionData} />,
    );
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("January")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
    expect(getByText("150")).toBeInTheDocument();
  });

  test("renders transaction details correctly", () => {
    const { getByText } = render(
      <RewardsByMonths transactionData={mockTransactionData} />,
    );
    expect(
      getByText("Transaction Date: 2023-01-15 - $100 - Points: 30"),
    ).toBeInTheDocument();
  });
});
