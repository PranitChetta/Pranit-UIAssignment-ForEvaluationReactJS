import React from "react";

const RewardsByMonths = ({ transactionData }) => (
  <div className="container">
    <h2>Points Rewards System Totals by Customer Months</h2>
    <table>
      <thead>
        <tr>
          <th>Customer</th>
          <th>Month</th>
          <th># of Transactions</th>
          <th>Reward Points</th>
        </tr>
      </thead>
      <tbody>
        {transactionData.summaryByCustomer.map((row, index) => (
          <React.Fragment key={index}>
            <tr>
              <td>{row.name}</td>
              <td>{row.month}</td>
              <td>{row.numTransactions}</td>
              <td>{row.points}</td>
            </tr>
            <tr>
              <td colSpan="4">
                <div>
                  {transactionData.pointsPerTransaction
                    .filter(
                      (tableRow) =>
                        row.custid === tableRow.custid &&
                        row.monthNumber === tableRow.month,
                    )
                    .map((transaction, idx) => (
                      <div key={idx}>
                        <strong>Transaction Date:</strong>{" "}
                        {transaction.transactionDt} - <strong>$</strong>
                        {transaction.amt} - <strong>Points: </strong>{" "}
                        {transaction.points}
                      </div>
                    ))}
                </div>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
);

export default RewardsByMonths;
