import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import RewardsByMonths from "../components/RewardsByMonths";

describe("RewardsByMonths component", () => {
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
    const { getByTestId } = render(
      <RewardsByMonths transactionData={mockTransactionData} />,
    );
    const transactionRow = getByTestId("transaction-row");
    expect(transactionRow).toHaveTextContent(
      "Transaction Date: 2023-01-15 - $100 - Points: 30",
    );
  });
});
