export const transactionCalculator = (data) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const calculatePoints = (transaction) => {
    let points = 0;
    let over100 = transaction.amt - 100;
    if (over100 > 0) {
      points += over100 * 2;
    }
    if (transaction.amt > 50) {
      points += 50;
    }

    let month;
    if (
      !(transaction.transactionDt instanceof Date) &&
      isNaN(new Date(transaction.transactionDt))
    ) {
      month = "N/A";
    } else {
      month = new Date(transaction.transactionDt).getMonth();
    }
    return { ...transaction, points, month };
  };

  const calculateTotals = (pointsPerTransaction) => {
    let byCustomer = {};
    let totalPointsByCustomer = {};
    pointsPerTransaction.forEach((transaction) => {
      const { custid, name, month, points } = transaction;
      if (!byCustomer[custid]) {
        byCustomer[custid] = [];
      }
      if (!totalPointsByCustomer[name]) {
        totalPointsByCustomer[name] = 0;
      }
      totalPointsByCustomer[name] += points;
      if (byCustomer[custid][month]) {
        byCustomer[custid][month].points += points;
        byCustomer[custid][month].numTransactions++;
      } else {
        byCustomer[custid][month] = {
          custid,
          name,
          monthNumber: month,
          month: months[month],
          numTransactions: 1,
          points,
        };
      }
    });
    return {
      summaryByCustomer: Object.values(byCustomer).flat(),
      pointsPerTransaction,
      totalPointsByCustomer: Object.entries(totalPointsByCustomer).map(
        ([name, points]) => ({ name, points }),
      ),
    };
  };

  const pointsPerTransaction = data.map(calculatePoints);
  return calculateTotals(pointsPerTransaction);
};

export const API = "https://api.npoint.io/db992f852448a116aa83";
