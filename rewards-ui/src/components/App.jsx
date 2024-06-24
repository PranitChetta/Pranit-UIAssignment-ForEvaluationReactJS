import React, { useState, useEffect } from "react";
import RewardsByMonths from "./RewardsByMonths";
import CustomerTotals from "./CustomerTotals";
import "../styles.css";
import { transactionCalculator, API } from "../utils";
function App() {
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(API, { signal }); // Pass the signal to fetch
        const data = await response.json();
        console.log({ data });
        const results = transactionCalculator(data);
        setTransactionData(results);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching data:", error);
          setError(error);
        }
      }
    };

    fetchData();

    return () => {
      // Abort the request when the component unmounts
      controller.abort();
    };
  }, []);
  if (transactionData == null) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Something went wrong while fetching data! Error: {error} </h2>;
  }

  return (
    <div className="App">
      <RewardsByMonths transactionData={transactionData} />
      <CustomerTotals transactionData={transactionData} />
    </div>
  );
}

export default App;
