import React from "react";

const CustomerTotals = ({ transactionData }) => (
  <div className="container">
    <h2>Points Rewards System Totals By Customer</h2>
    <table>
      <thead>
        <tr>
          <th>Customer</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {transactionData.totalPointsByCustomer.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CustomerTotals;
