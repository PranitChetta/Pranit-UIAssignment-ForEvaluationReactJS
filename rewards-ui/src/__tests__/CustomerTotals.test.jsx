import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomerTotals from "../components/CustomerTotals";

describe("CustomerTotals component", () => {
  const mockData = {
    totalPointsByCustomer: [
      { name: "John Doe", points: 150 },
      { name: "Jane Smith", points: 200 },
    ],
  };

  test("renders table headers and data correctly", () => {
    render(<CustomerTotals transactionData={mockData} />);
    expect(
      screen.getByText("Points Rewards System Totals By Customer"),
    ).toBeInTheDocument();
    expect(screen.getByText("Customer")).toBeInTheDocument();
    expect(screen.getByText("Points")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
  });
});
